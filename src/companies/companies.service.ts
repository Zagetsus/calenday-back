import { BadRequestException, Injectable } from "@nestjs/common";
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyValidate } from './validations/company.validation';
import { validation } from '../validation/validation';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async validateDataCreate(data) {
    const validateCompany = new CompanyValidate();

    validateCompany.cnpj = data.cnpj;
    validateCompany.name = data.name;
    validateCompany.corporate_name = data.corporate_name;
    validateCompany.trading_name = data.trading_name ?? '';

    const validated = await validation(validateCompany);

    if (!validated.status) {
      throw new BadRequestException({
        status: false,
        message: 'Dados inválidos',
        errors: validated.errors,
      });
    }

    return {
      status: true,
      message: 'Campos validados!',
    };
  }

  async findByCnpj(cnpj: string) {
    return await this.companyRepository.findOne({ where: { cnpj: cnpj } });
  }

  async create(data) {
    const createdCompany = this.companyRepository.create(data);
    return await this.companyRepository.save(createdCompany);
  }
}

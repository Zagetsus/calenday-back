import { Body, Controller, Post, Request, Response } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { removeMask } from '../utils/removeMask';
import { validateCNPJ } from '../utils/validations';
import { UsersPermissionsService } from '../users-permissions/users-permissions.service';
import { SALON } from "../utils/constants";

interface IBody {
  name: string;
  cnpj: string;
  corporate_name: string;
  trading_name: string;
}

@Controller('companies')
export class CompaniesController {
  constructor(
    private companyService: CompaniesService,
    private userPermissionsService: UsersPermissionsService,
  ) {}

  @Post()
  async store(@Request() request, @Response() response, @Body() body: IBody) {
    const { id } = request.user;
    await this.companyService.validateDataCreate(body);

    body.cnpj = removeMask(body.cnpj, 'cnpj');

    if (!validateCNPJ(body.cnpj))
      return response.status(400).json({
        message: 'O CNPJ informado está em um formato incorreto!',
      });

    const existsCompany = await this.companyService.findByCnpj(body.cnpj);

    if (existsCompany)
      return response
        .status(400)
        .json({ message: 'Esse CNPJ já está cadastrado!' });

    await this.companyService.create({ user_id: id, ...body });

    await this.userPermissionsService.create({
      user_id: id,
      permission_id: SALON,
    });

    return response
      .status(201)
      .json({ status: true, message: 'Salão cadastrado com sucesso!' });
  }
}

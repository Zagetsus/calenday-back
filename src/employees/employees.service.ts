import { BadRequestException, Injectable } from '@nestjs/common';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeValidate } from './validation/employee.validation';
import { validation } from '../validation/validation';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async validateFields(data) {
    const validateEmployee = new EmployeeValidate();

    validateEmployee.cpf = data.cpf;
    validateEmployee.email = data.email;
    validateEmployee.name = data.name;
    validateEmployee.password = data.password;
    validateEmployee.phone = data.phone;

    const validated = await validation(validateEmployee);

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

  async create(data) {
    const employeeCreated = this.employeeRepository.create(data);
    return this.employeeRepository.save(employeeCreated);
  }

  async findByEmail(email: string, company_id: number) {
    return await this.employeeRepository.findOne({
      relations: ['user'],
      where: { user: { email }, company_id },
    });
  }

  async findAllEmployee(company_id) {
    const employees = await this.employeeRepository.find({
      relations: ['user', 'occupation'],
      where: { company_id },
    });

    const formatterEmployee = [];

    for (const employee of employees) {
      formatterEmployee.push({
        id: employee.id,
        name: employee.user.name,
        email: employee.user.email,
        cpf: employee.user.cpf,
        birth_date: employee.user.birth_date,
        phone: employee.user.phone,
        occupation: employee.occupation.occupation,
      });
    }

    return formatterEmployee;
  }
}

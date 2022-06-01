import { Controller, Post, Request, Response, Body, Get } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EMPLOYEE, MANAGER, SALON } from '../utils/constants';
import { UsersService } from '../users/users.service';
import { UsersPermissionsService } from '../users-permissions/users-permissions.service';
import { removeMask } from "../utils/removeMask";

@Controller('employees')
export class EmployeesController {
  constructor(
    private employeeService: EmployeesService,
    private userPermissionService: UsersPermissionsService,
    private userService: UsersService,
  ) {}

  @Get()
  async index(@Request() request, @Response() response) {
    const employees = await this.employeeService.findAllEmployee(
      request.user.company.id,
    );


    return response.status(200).json(employees);
  }

  @Post()
  async create(@Request() request, @Response() response, @Body() body) {
    const { permission, company } = request.user;
    const { occupation, ...data } = body;
    let user;

    if (permission !== SALON && permission !== MANAGER) {
      return response.status(401).json({
        status: false,
        message: 'Você não tem permissão para cadastrar um funcionário',
      });
    }

    await this.employeeService.validateFields(data);
    body.cpf = removeMask(body.phone, 'cpf');
    body.phone = removeMask(body.phone, 'phone');

    const existsEmployee = await this.employeeService.findByEmail(
      data.email,
      company.id,
    );

    if (existsEmployee)
      return response.status(400).json({
        status: false,
        message: 'Esse funcinário já existe na sua empresa',
      });

    const existsUser = await this.userService.findByEmail(data.email);

    if (existsUser) {
      user = await this.userService.update(existsUser.id, data);

      if (existsUser.permissions.permission_id !== SALON) {
        await this.userPermissionService.create({
          user_id: existsUser.id,
          permission_id: occupation === 2 ? MANAGER : EMPLOYEE,
        });
      }
    } else {
      user = await this.userService.create(data);

      await this.userPermissionService.create({
        user_id: user.id,
        permission_id: occupation === 2 ? MANAGER : EMPLOYEE,
      });
    }

    await this.employeeService.create({
      user_id: user.id,
      company_id: company.id,
      occupation_id: occupation || 1,
    });

    return response.status(201).json(user);
  }
}

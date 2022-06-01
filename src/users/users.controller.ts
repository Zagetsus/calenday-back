import {
  Controller,
  Post,
  Request,
  Response,
  Body,
  Get,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { validation } from '../validation/validation';
import { UserValidate } from './validation/user.validation';
import { CUSTOMER, Public } from '../utils/constants';
import { UsersPermissionsService } from '../users-permissions/users-permissions.service';
import { removeMask } from '../utils/removeMask';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private userPermission: UsersPermissionsService,
  ) {}

  @Public()
  @Post()
  async store(@Request() request, @Response() response, @Body() body) {
    const emailExist = await this.usersService.findByEmail(body.email);

    if (emailExist)
      return response.status(400).json({ message: 'Esse usuário já existe' });

    const userValidate = new UserValidate();

    userValidate.name = body.name;

    if (body.email) userValidate.email = body.email;
    if (body.password) userValidate.password = body.password;

    const validated = await validation(userValidate);

    if (!validated.status) return response.status(400).json(validated.errors);

    body.cpf = removeMask(body.cpf, 'cpf');

    const user = await this.usersService.create(body);

    await this.userPermission.create({
      user_id: user.id,
      permission_id: CUSTOMER,
    });

    return response.status(201).json(user);
  }

  @Public()
  @Get(':cpf')
  async show(@Request() request, @Response() response, @Param() { cpf }) {
    const user = await this.usersService.findByCpf(cpf);

    if (!user) return response.status(200).json({ user: null });

    const { password, ...result } = user;

    return response.status(200).json({ user: result });
  }
}

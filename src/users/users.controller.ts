import { Controller, Post, Request, Response, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { validation } from '../validation/validation';
import { UserValidate } from './validation/user.validation';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async store(@Request() request, @Response() response, @Body() body) {
    const emailExist = await this.usersService.findByEmail(body.email);

    if (emailExist)
      return response.status(400).json({ message: 'Esse usuário já existe' });

    const userValidate = new UserValidate();

    userValidate.name = body.name;
    userValidate.email = body.email;
    userValidate.password = body.password;

    const validated = await validation(userValidate);

    if (!validated.status) return response.status(400).json(validated.errors);

    const user = await this.usersService.create(body);

    return response.status(201).json(user);
  }
}

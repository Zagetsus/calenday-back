import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

function authError() {
  throw new UnauthorizedException({
    status: false,
    type: 'toast',
    message: 'Usuário e/ou senha incorretos',
  });
}

@Injectable()
export class AuthService {
  constructor(
    private readonly _jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user || !(await compare(password, user.password))) {
      authError();
    }

    if (!user.employee && !user.company) {
      authError();
    }

    return user;
  }

  public async login(user: User) {
    const access_token = await this._sign(user);

    const userReturn = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      permission: user.permissions.permission_id,
      companyName: user.company && user.company.name,
      employee: !!user.employee,
    };

    return {
      access_token,
      user: userReturn,
    };
  }

  private async _sign(user: User) {
    const sign = {
      id: user.id,
      name: user.name,
      email: user.email,
      permission: user.permissions.permission_id,
      company: user.company && {
        name: user.company.name,
        id: user.company.id,
      },
      employee: user.employee && {
        id: user.employee.id,
        occupation: user.employee.occupation_id,
      },
    };

    return this._jwtService.sign(sign);
  }
}

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

    console.log(user);

    if (!user || !(await compare(password, user.password))) {
      authError();
    }

    return user;
  }

  public async login(user: User) {
    try {
      const access_token = await this._sign(user);

      const userReturn = {
        name: user.name,
        email: user.email,
        phone: user.phone,
        permission: user.permissions.permission_id,
      };

      return {
        access_token,
        user: userReturn,
      };
    } catch (err) {
      authError();
    }
  }

  private async _sign(user: User) {
    const { password, ...result } = user;

    const sign = {
      id: result.id,
      name: result.name,
      email: result.email,
      permission: result.permissions.permission_id,
    };

    return this._jwtService.sign(sign);
  }
}

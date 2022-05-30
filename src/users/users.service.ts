import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { IUser } from '../interfaces/users.interfaces';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      select: [
        'id',
        'name',
        'email',
        'password',
        'cpf',
        'birth_date',
        'phone',
        'active',
        'permissions',
        'company',
      ],
      relations: ['permissions', 'company', 'employee'],
      where: { email },
    });
  }
  async findByCpf(cpf: string) {
    return await this.userRepository.findOne({
      where: { cpf },
    });
  }
  async findByPhone(phone: string) {
    return await this.userRepository.findOne({
      where: { phone },
    });
  }

  async create(data: IUser): Promise<User> {
    data.password = await hash(data.password, 8);

    const created = await this.userRepository.create(data);
    const newUser = await this.userRepository.save(created);

    delete newUser.password;

    return newUser;
  }

  async update(id, data) {
    await this.userRepository.update(id, data);

    return await this.userRepository.findOne({ id });
  }
}

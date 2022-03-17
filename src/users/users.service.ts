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
    return await this.userRepository.findOne({ email });
  }

  async create(data: IUser): Promise<User> {
    data.password = await hash(data.password, 8);

    const created = await this.userRepository.create(data);
    const newUser = await this.userRepository.save(created);

    delete newUser.password;

    return newUser;
  }
}

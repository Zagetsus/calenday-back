import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersPermissions } from './entities/users-permissions.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersPermissionsService {
  constructor(
    @InjectRepository(UsersPermissions)
    private usersPermissionsRepository: Repository<UsersPermissions>,
  ) {}

  async verifyExistingUserId(user_id: number) {
    return await this.usersPermissionsRepository.findOne({ user_id });
  }

  async create(data) {
    const existsUserPermission = await this.verifyExistingUserId(data.user_id);

    if (existsUserPermission) {
      return await this.update(existsUserPermission.id, data);
    }

    const userPermissionCreated = this.usersPermissionsRepository.create(data);
    return await this.usersPermissionsRepository.save(userPermissionCreated);
  }

  async update(id, data) {
    return await this.usersPermissionsRepository.update(id, data);
  }
}

import { Module } from '@nestjs/common';
import { UsersPermissionsService } from './users-permissions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersPermissions } from './entities/users-permissions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersPermissions])],
  exports: [UsersPermissionsService],
  providers: [UsersPermissionsService],
})
export class UsersPermissionsModule {}

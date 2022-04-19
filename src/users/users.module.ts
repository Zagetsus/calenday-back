import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersPermissionsModule } from '../users-permissions/users-permissions.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UsersPermissionsModule],
  controllers: [UsersController],
  exports: [UsersService],
  providers: [UsersService],
})
export class UsersModule {}

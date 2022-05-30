import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { UsersModule } from '../users/users.module';
import { UsersPermissionsModule } from '../users-permissions/users-permissions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
    UsersModule,
    UsersPermissionsModule,
  ],
  providers: [EmployeesService],
  controllers: [EmployeesController],
})
export class EmployeesModule {}

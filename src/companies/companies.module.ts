import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { UsersPermissionsModule } from '../users-permissions/users-permissions.module';

@Module({
  imports: [TypeOrmModule.forFeature([Company]), UsersPermissionsModule],
  providers: [CompaniesService],
  controllers: [CompaniesController],
})
export class CompaniesModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SchedulesModule } from './schedules/schedules.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { CompaniesModule } from './companies/companies.module';
import { EmployeesModule } from './employees/employees.module';
import { OccupationsModule } from './occupations/occupations.module';
import { PermissionsModule } from './permissions/permissions.module';
import { UsersPermissionsModule } from './users-permissions/users-permissions.module';
import { ServicesModule } from './services/services.module';
import { SpecialtiesModule } from './specialties/specialties.module';
import { EmployeesSpecialtiesModule } from './employees-specialties/employees-specialties.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    SchedulesModule,
    CompaniesModule,
    EmployeesModule,
    OccupationsModule,
    PermissionsModule,
    UsersPermissionsModule,
    ServicesModule,
    SpecialtiesModule,
    EmployeesSpecialtiesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}

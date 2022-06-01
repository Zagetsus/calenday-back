import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Request,
  Response,
  Body,
  Param,
} from '@nestjs/common';
import { SchedulesService } from './schedules.service';

@Controller('schedules')
export class SchedulesController {
  constructor(private schedulesService: SchedulesService) {}

  @Post()
  async store(@Request() request, @Response() response, @Body() body) {
    const { company } = request.user;

    body.company_id = company.id;
    body.status = true;

    const schedule = await this.schedulesService.create(body);

    return response.status(201).json({ schedule });
  }

  @Get()
  async index(@Request() request, @Response() response) {
    const { company } = request.user;

    const employees = await this.schedulesService.findEmployeesBySchedules(
      company.id,
    );

    for (const employee of employees) {
      employee.allAppointments = await this.schedulesService.getSchedules(
        company.id,
        employee.employee_id,
      );
    }

    return response.status(200).json(employees);
  }

  @Get(':id')
  async show(@Request() request, @Response() response, @Param() param) {
    const { company } = request.user;

    const existSchedule = await this.schedulesService.show(
      param.id,
      company.id,
    );

    return response.status(200).json(existSchedule);
  }

  @Put(':id')
  async update(
    @Request() request,
    @Response() response,
    @Body() body,
    @Param() param,
  ) {
    await this.schedulesService.update(param.id, body);

    return response.status(200).json({ message: 'Agendamento atualizado' });
  }

  @Delete(':id')
  async delete(@Request() request, @Response() response, @Param() param) {
    const { company } = request.user;

    const existSchedule = await this.schedulesService.show(
      param.id,
      company.id,
    );

    if (!existSchedule) {
      return response
        .status(400)
        .json({ message: 'Esse agendamento não existe' });
    }

    await this.schedulesService.cancellation(param.id);

    return response.status(200).json({ message: 'Agendamento cancelado!' });
  }
}

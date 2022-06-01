import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Schedule } from './entities/schedule.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { format } from 'date-fns';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule)
    private schedulesEntity: Repository<Schedule>,
  ) {}

  async create(data) {
    const scheduleCreated = this.schedulesEntity.create(data);
    return await this.schedulesEntity.save(scheduleCreated);
  }

  async findEmployeesBySchedules(company_id) {
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date();
    endDate.setHours(23, 59, 59, 59);

    const start = format(startDate, 'yyyy/MM/dd HH:mm:ss');
    const end = format(endDate, 'yyyy/MM/dd HH:mm:ss');

    return await this.schedulesEntity
      .createQueryBuilder('s')
      .select('e.id as employee_id, u.name as name, o.occupation as occupation')
      .innerJoin('tb_employees', 'e', 's.employee_id = e.id')
      .innerJoin('tb_users', 'u', 'u.id = e.user_id')
      .innerJoin('tb_occupations', 'o', 'o.id = e.occupation_id')
      .where(
        `s.company_id = ${company_id} AND (s.start_date BETWEEN '${start}' AND '${end}')`,
      )
      .groupBy('s.employee_id')
      .getRawMany();
  }

  async getSchedules(company_id, employee_id) {
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date();
    endDate.setHours(23, 59, 59, 59);

    const start = format(startDate, 'yyyy/MM/dd HH:mm:ss');
    const end = format(endDate, 'yyyy/MM/dd HH:mm:ss');

    return await this.schedulesEntity
      .createQueryBuilder('s')
      .select(
        's.id as id, u.name as customer, se.name as service, s.observation as observation, s.start_date as start, s.end_date as end, s.status as status',
      )
      .innerJoin('tb_users', 'u', 'u.id = s.customer_id')
      .innerJoin('tb_services', 'se', 'se.id = s.service_id')
      .where(
        `s.company_id = ${company_id} AND s.employee_id = ${employee_id} AND (s.start_date BETWEEN '${start}' AND '${end}')`,
      )
      .orderBy('s.start_date', 'ASC')
      .getRawMany();
  }

  async show(id, company_id) {
    return await this.schedulesEntity.findOne({
      where: { id, company_id },
    });
  }

  async cancellation(id: number) {
    return await this.schedulesEntity.update(id, { status: false });
  }

  async update(id: number, data) {
    return await this.schedulesEntity.update(id, data);
  }
}

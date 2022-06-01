import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Company } from '../../companies/entities/company.entity';
import { Employee } from '../../employees/entities/employee.entity';
import { Service } from '../../services/entities/service.entity';

@Entity('tb_schedules')
export class Schedule {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  customer_id: number;

  @Column()
  employee_id: number;

  @Column()
  company_id: number;

  @Column()
  service_id: number;

  @Column({ type: 'datetime' })
  start_date: string;

  @Column({ type: 'datetime' })
  end_date: string;

  @Column()
  status: boolean;

  @Column()
  observation: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
  user: User;

  @OneToOne(() => Company)
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: Company;

  @OneToOne(() => Employee)
  @JoinColumn({ name: 'employee_id', referencedColumnName: 'id' })
  employee: Employee;

  @OneToOne(() => Service)
  @JoinColumn({ name: 'service_id', referencedColumnName: 'id' })
  service: Service;
}

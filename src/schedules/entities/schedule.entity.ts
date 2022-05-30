import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tb_schedule')
export class Schedule {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  customer_id: number;

  @Column()
  employee_id: number;
}

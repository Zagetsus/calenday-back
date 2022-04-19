import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Company } from '../../companies/entities/company.entity';
import { Occupation } from '../../occupations/entities/occupation.entity';

@Entity('tb_employees')
export class Employee {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  user_id: number;

  @Column()
  company_id: number;

  @Column()
  occupation_id: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP()' })
  created_at: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
    onUpdate: 'CURRENT_TIMESTAMP()',
  })
  updated_at: Date;

  @CreateDateColumn({ type: 'timestamp' })
  deleted_at: Date;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @OneToOne(() => Company)
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: User;

  @OneToOne(() => Occupation)
  @JoinColumn({ name: 'occupation_id', referencedColumnName: 'id' })
  occupation: Occupation;
}

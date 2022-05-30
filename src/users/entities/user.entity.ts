import {
  Column,
  CreateDateColumn, DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm";
import { UsersPermissions } from '../../users-permissions/entities/users-permissions.entity';
import { Company } from '../../companies/entities/company.entity';
import { Employee } from '../../employees/entities/employee.entity';

@Entity('tb_users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  cpf: string;

  @Column()
  birth_date: Date;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP()' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
    onUpdate: 'CURRENT_TIMESTAMP()',
  })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date;

  @OneToOne(() => UsersPermissions)
  @JoinColumn({ name: 'id', referencedColumnName: 'user_id' })
  permissions: UsersPermissions;

  @OneToOne(() => Company)
  @JoinColumn({ name: 'id', referencedColumnName: 'user_id' })
  company: Company;

  @OneToOne(() => Employee)
  @JoinColumn({ name: 'id', referencedColumnName: 'id' })
  employee: Employee;
}

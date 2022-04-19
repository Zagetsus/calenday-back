import {
  Column,
  CreateDateColumn,
  Entity, JoinColumn, OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { UsersPermissions } from "../../users-permissions/entities/users-permissions.entity";

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

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
    onUpdate: 'CURRENT_TIMESTAMP()',
  })
  updated_at: Date;

  @CreateDateColumn({ type: 'timestamp' })
  deleted_at: Date;

  @OneToOne(() => UsersPermissions)
  @JoinColumn({ name: 'id', referencedColumnName: 'user_id' })
  permissions: UsersPermissions;
}

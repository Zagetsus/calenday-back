import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tb_permissions')
export class Permission {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  permission: string;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tb_services')
export class Service {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  duration: number;

  @Column()
  price: number;
}

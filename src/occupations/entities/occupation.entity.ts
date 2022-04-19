import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tb_occupations')
export class Occupation {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  occupation: string;
}

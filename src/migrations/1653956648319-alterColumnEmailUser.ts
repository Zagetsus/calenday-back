import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterColumnEmailUser1653956648319 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE tb_users MODIFY COLUMN email varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE tb_users MODIFY COLUMN email varchar(255) NOT NULL`,
    );
  }
}

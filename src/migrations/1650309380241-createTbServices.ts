import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTbServices1650309380241 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_services',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar(30)',
          },
          {
            name: 'duration',
            type: 'int',
          },
          {
            name: 'price',
            type: 'decimal(10,2)',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tb_services');
  }
}

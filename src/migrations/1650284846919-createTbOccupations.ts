import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTbOccupations1650284846919 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_occupations',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'occupation',
            type: 'varchar',
          },
        ],
      }),
      true,
    );

    await queryRunner.query(`
        INSERT INTO tb_occupations (occupation) VALUES
        ('Funcionário'),
        ('Gerente')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tb_occupations');
  }
}

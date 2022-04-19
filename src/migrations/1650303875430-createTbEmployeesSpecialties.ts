import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTbEmployeesSpecialties1650303875430 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_specialties',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'specialty',
            type: 'varchar(35)',
          },
        ],
      }),
      true,
    );

    await queryRunner.query(`
        INSERT INTO tb_specialties (specialty) VALUES
        ('Cabeleireiro'),
        ('Depilação'),
        ('Maquiagem'),
        ('Esteticista'),
        ('Manicure'),
        ('Pedicure')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tb_specialties');
  }
}

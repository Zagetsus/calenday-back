import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class createTbEmployeesXSpecialties1650305733947 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_employees_specialties',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'employee_id',
            type: 'int',
          },
          {
            name: 'specialty_id',
            type: 'int',
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys('tb_employees_specialties', [
      new TableForeignKey({
        columnNames: ['employee_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tb_employees',
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['specialty_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tb_specialties',
        onDelete: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('tb_employees_specialties');
    const foreignKeys = table.foreignKeys.filter(
      (fk) =>
        fk.columnNames.indexOf('employee_id') !== -1 ||
        fk.columnNames.indexOf('specialty_id') !== -1,
    );

    await queryRunner.dropForeignKeys('tb_employees_specialties', foreignKeys);
    await queryRunner.dropTable('tb_employees_specialties');
  }
}

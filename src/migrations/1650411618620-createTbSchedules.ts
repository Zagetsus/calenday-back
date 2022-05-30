import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class createTbSchedules1650411618620 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_schedules',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'customer_id',
            type: 'int',
          },
          {
            name: 'employee_id',
            type: 'int',
          },
          {
            name: 'company_id',
            type: 'int',
          },
          {
            name: 'service_id',
            type: 'int',
          },
          {
            name: 'start_date',
            type: 'datetime',
          },
          {
            name: 'end_date',
            type: 'datetime',
          },
          {
            name: 'status',
            type: 'boolean',
          },
          {
            name: 'observation',
            type: 'text',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKeys('tb_schedules', [
      new TableForeignKey({
        columnNames: ['customer_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tb_users',
      }),
      new TableForeignKey({
        columnNames: ['employee_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tb_employees',
      }),
      new TableForeignKey({
        columnNames: ['company_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tb_companies',
      }),
      new TableForeignKey({
        columnNames: ['service_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tb_services',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('tb_schedules');
    const foreignKeys = table.foreignKeys.filter(
      (fk) =>
        fk.columnNames.indexOf('customer_id') !== -1 ||
        fk.columnNames.indexOf('employee_id') !== -1 ||
        fk.columnNames.indexOf('company_id') !== -1 ||
        fk.columnNames.indexOf('service_id') !== -1,
    );

    await queryRunner.dropForeignKeys('tb_schedules', foreignKeys);
    await queryRunner.dropTable('tb_schedules');
  }
}

import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createTbEmployees1650289888119 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_employees',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'user_id',
            type: 'int',
          },
          {
            name: 'company_id',
            type: 'int',
          },
          {
            name: 'occupation_id',
            type: 'int',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP()',
            onUpdate: 'CURRENT_TIMESTAMP()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKeys('tb_employees', [
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tb_users',
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['company_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tb_companies',
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['occupation_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tb_occupations',
        onDelete: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('tb_employees');
    const foreignKey = table.foreignKeys.filter(
      (fk) =>
        fk.columnNames.indexOf('user_id') !== -1 ||
        fk.columnNames.indexOf('company_id') !== -1 ||
        fk.columnNames.indexOf('occupation_id') !== -1,
    );

    await queryRunner.dropForeignKeys('tb_employees', foreignKey);
    await queryRunner.dropTable('tb_employees');
  }
}

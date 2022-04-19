import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class createTbUsersXPermissions1650323324654 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_users_permissions',
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
            name: 'permission_id',
            type: 'int',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKeys('tb_users_permissions', [
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tb_users',
      }),
      new TableForeignKey({
        columnNames: ['permission_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tb_permissions',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('tb_users_permissions');
    const foreignKeys = table.foreignKeys.filter(
      (fk) =>
        fk.columnNames.indexOf('user_id') !== -1 ||
        fk.columnNames.indexOf('permission_id') !== -1,
    );

    await queryRunner.dropForeignKeys('tb_users_permissions', foreignKeys);
    await queryRunner.dropTable('tb_users_permissions');
  }
}

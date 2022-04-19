import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTbUserPermissions1650321412532 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_permissions',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'permission',
            type: 'varchar(30)',
          },
        ],
      }),
      true,
    );

    await queryRunner.query(`
      INSERT INTO tb_permissions(permission) VALUES 
      ('SALÃO'),
      ('GERENTE'),
      ('FUNCIONARIO'),
      ('CLIENTE')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tb_permissions');
  }
}

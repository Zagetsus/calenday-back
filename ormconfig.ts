module.exports = {
  type: 'mysql',
  port: 3306,
  host: process.env.TYPEORM_HOST,
  database: process.env.TYPEORM_DATABASE,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  timezone: '-03:00',
  synchronize: false,
  logging: false,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/src/migrations/*.js'],
  migrationsTableName: 'tb_migrations',
  cli: {
    migrationsDir: 'src/migrations',
  },
};

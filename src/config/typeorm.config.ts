import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import Config from '../config';

const { db } = Config;

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: db.host,
  port: db.port,
  username: db.username,
  password: db.password,
  database: db.name,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};

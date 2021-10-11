import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '_Imp03xpo',
  database: 'takdb',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  cache: false,
};

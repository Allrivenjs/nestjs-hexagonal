import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from '../shared/config/database.config';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        const database = config.get<DatabaseConfig>('database');
        console.log(__dirname + '/**/*.entity{.ts,.js}');
        return {
          type: 'postgres',
          host: database.host,
          port: database.port,
          username: database.user,
          password: database.password,
          database: database.name,
          entities: [__dirname + '/entities/*.entity{.ts,.js}'],
          synchronize: false,
          logging: ['query'],
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class PostgressModule {}

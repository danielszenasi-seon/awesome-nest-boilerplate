import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { isNil } from 'lodash';
import { type TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  get isTest(): boolean {
    return this.nodeEnv === 'test';
  }

  private getNumber(key: string): number {
    const value = this.get(key);

    try {
      return Number(value);
    } catch {
      throw new Error(`${key} environment variable is not a number`);
    }
  }

  private getBoolean(key: string): boolean {
    const value = this.get(key);

    try {
      return Boolean(JSON.parse(value));
    } catch {
      throw new Error(`${key} env var is not a boolean`);
    }
  }

  private getString(key: string): string {
    const value = this.get(key);

    return value.replaceAll('\\n', '\n');
  }

  get nodeEnv(): string {
    return this.getString('NODE_ENV');
  }

  get documentationEnabled(): boolean {
    return this.getBoolean('ENABLE_DOCUMENTATION');
  }

  get appConfig() {
    return {
      port: this.getString('PORT'),
    };
  }

  get loggerConfig() {
    return {
      pinoHttp: {
        transport: this.isDevelopment ? { target: 'pino-pretty' } : undefined,
      },
    };
  }

  get postgresConfig(): TypeOrmModuleOptions {
    const entities = [
      `${__dirname}/../../modules/**/*.entity{.ts,.js}`,
      `${__dirname}/../../modules/**/*.view-entity{.ts,.js}`,
    ];
    const migrations = [`${__dirname}/../../database/migrations/*{.ts,.js}`];

    return {
      entities,
      migrations,
      keepConnectionAlive: !this.isTest,
      dropSchema: this.isTest,
      type: 'postgres',
      name: 'default',
      host: this.getString('DB_HOST'),
      port: this.getNumber('DB_PORT'),
      username: this.getString('DB_USERNAME'),
      password: this.getString('DB_PASSWORD'),
      database: this.getString('DB_DATABASE'),
      migrationsRun: true,
      logging: this.getBoolean('ENABLE_ORM_LOGS'),
    };
  }

  private get(key: string): string {
    const value = this.configService.get<string>(key);

    if (isNil(value)) {
      throw new Error(`${key} environment variable does not set`); // probably we should call process.exit() too to avoid locking the service
    }

    return value;
  }
}

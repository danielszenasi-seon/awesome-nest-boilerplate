import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateCatDto } from 'src/modules/cats/dtos/create-cat.dto';
import { CatsModule } from '../../src/modules/cats/cats.module';

describe('Cats - /cats (e2e)', () => {
  const cats = {
    name: 'name #1',
    age: 1,
    breed: 'Maine Coon',
  };

  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        // TODO import database options from config
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'postgres',
          database: 'test',
          migrationsRun: true,
          dropSchema: true,
          keepConnectionAlive: false,
          migrations: [`${__dirname}/../../src/database/migrations/*{.ts,.js}`],
          entities: [
            `${__dirname}/../../src/modules/**/*.entity{.ts,.js}`,
            `${__dirname}/../../src/modules/**/*.view-entity{.ts,.js}`,
          ],
        }),
        CatsModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Create [POST /cats]', () => {
    return request(app.getHttpServer())
      .post('/cats')
      .send(cats as CreateCatDto)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual(expect.objectContaining(cats));
      });
  });

  it('Get all cats [GET /cats]', () => {
    return request(app.getHttpServer())
      .get('/cats')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined();
      });
  });

  // TODO get uuid from the db
  // it('Get one car [GET /cats/:id]', () => {
  //   return request(app.getHttpServer())
  //     .get('/cats/2')
  //     .expect(200)
  //     .then(({ body }) => {
  //       expect(body).toBeDefined();
  //     });
  // });

  // it('Delete one cat [DELETE /cats/:id]', () => {
  //   return request(app.getHttpServer()).delete('/cats/1').expect(200);
  // });

  afterAll(async () => {
    await app.close();
  });
});

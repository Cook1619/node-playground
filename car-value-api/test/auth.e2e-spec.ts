import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Auth System', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signup request', () => {
    const email = 'test12344@test.com';
    // sets up a request to our http server
    // chain on methods to a certain request
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: '123pass' })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(email);
      });
  });
  it('signup as a new user then get the currently logged in user', async () => {
    const email = 'test12344@test.com';
    // sets up a request to our http server
    // chain on methods to a certain request
    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: '123pass' })
      .expect(201);

    const cookie = res.get('Set-cookie');

    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200);
    expect(body.email).toEqual(email);
  });
});

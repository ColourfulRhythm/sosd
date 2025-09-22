import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { AuthDto } from '../src/auth/dto';

describe('App e2e', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleRef.createNestApplication();
        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
            }),
        );
        await app.init();
        await app.listen(3333);

        pactum.request.setBaseUrl('http://localhost:4000');
    });

    afterAll(() => {
        app.close();
    });

    describe('Auth', () => {
        const dto: AuthDto = {
            accountName: 'adewambe',
            password: '123',
            phoneNumber: '07011249480',
            role: 'promoter',
            email: 'danoscolobo@gmail.com',
        };
        describe('Signup', () => {
            it('should throw if email empty', () => {
                return pactum
                    .spec()
                    .post('/auth/signup')
                    .withBody({
                        password: dto.password,
                    })
                    .expectStatus(400);
            });
            it('should throw if password empty', () => {
                return pactum
                    .spec()
                    .post('/auth/signup')
                    .withBody({
                        email: dto.email,
                    })
                    .expectStatus(400);
            });
            it('should throw if no body provided', () => {
                return pactum.spec().post('/auth/signup').expectStatus(400);
            });
            it('should signup', () => {
                return pactum
                    .spec()
                    .post('/auth/signup')
                    .withBody(dto)
                    .expectStatus(201);
            });
        });

        describe('Signin', () => {
            it('should throw if email empty', () => {
                return pactum
                    .spec()
                    .post('/auth/signin')
                    .withBody({
                        password: dto.password,
                    })
                    .expectStatus(400);
            });
            it('should throw if password empty', () => {
                return pactum
                    .spec()
                    .post('/auth/signin')
                    .withBody({
                        email: dto.email,
                    })
                    .expectStatus(400);
            });
            it('should throw if no body provided', () => {
                return pactum.spec().post('/auth/signin').expectStatus(400);
            });
            it('should signin', () => {
                return pactum
                    .spec()
                    .post('/auth/signin')
                    .withBody(dto)
                    .expectStatus(200)
                    .stores('userAt', 'token');
            });
        });

        describe('User', () => {
            describe('Get me', () => {
                it('should get current user', () => {
                    return pactum
                        .spec()
                        .get('/user')
                        .withHeaders({
                            Authorization: 'Bearer $S{userAt}',
                        })
                        .expectStatus(200);
                });
            });
        });
        describe('User', () => {
            describe('Get me', () => {
                it('should get current user', () => {
                    return pactum
                        .spec()
                        .get('/user')
                        .withHeaders({
                            Authorization: 'Bearer $S{userAt}',
                        })
                        .expectStatus(200)
                        .stores('user', 'data');
                });
            });
        });
    });
});

import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../users/auth.service';
import { UsersController } from '../users/users.controller';
import { User } from '../users/users.entity';
import { UsersService } from '../users/users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      //findOne
      findOne: (id: number) => {
        return Promise.resolve({ id, email: 'test@test.com', password: '123pass' } as User)
      },
      //find
      find: (email: string) => {
        return Promise.resolve([{ id: 1, email, password: '123pass' } as User])
      },
      //update 
      update: (id: number, attrs: Partial<User>) => {
        return Promise.resolve({ id, ...attrs } as User)
      },
      //remove
      remove: (id: number) => {
        return Promise.resolve({ id, email: 'test123', password: '123abc' } as User)
      }
    }
    fakeAuthService = {
      // //signUp
      // signUp: () => { },
      //signIn
      signIn: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as User)
      }
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService
        },
        {
          provide: AuthService,
          useValue: fakeAuthService
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers returns a list of users with a given email', async () => {
    const users = await controller.findAllUser('test@test.com')
    expect(users.length).toEqual(1)
    expect(users[0].email).toEqual('test@test.com')
  })

  it('findUser throws an error if user with given id is not found', async () => {
    fakeUsersService.findOne = () => null;
    await expect(controller.findUser('1')).rejects.toThrow(NotFoundException);
  });

  it('signIn updates session object and returns user', async () => {
    const session = { userId: 4 }
    const user = await controller.signIn({ email: 'test@test.com', password: 'pas123' }, session)
    expect(user.id).toEqual(1)
    expect(session.userId).toEqual(1)
  })
});

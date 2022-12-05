import { Test } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { User } from './users.entity';
import { UsersService } from './users.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';


describe('AuthService', () => {
    let service: AuthService;
    // this enables us to override behavior so we can change what methods return
    let fakeUsersService: Partial<UsersService>;

    beforeEach(async () => {
        // Create fake copy of user service
        // By typing this were ensuring all these methods have the correct type signature
        fakeUsersService = {
            // these methods are async by nature so Promise.resolve is the way we mock the real calls
            find: () => Promise.resolve([]),
            // the as User makes it so we don't have to define all the hooks in the user.entity file
            create: (email: string, password: string) => Promise.resolve({ id: 1, email, password } as User)
        }
        const module = await Test.createTestingModule({
            // list of classes we want registered in the DI container
            // we don't wanna use the real service so we create a fake one with the minimal information auth.service needs
            // sense authService only uses the find and create we only need to mock those methods
            providers: [
                AuthService,
                // tricks the di system into using the fake one
                {
                    // if anyone ask for this
                    provide: UsersService,
                    // give them this
                    useValue: fakeUsersService
                }
            ]
        }).compile();
        service = module.get(AuthService);
    })
    it('can create an instance of the auth service', async () => {
        expect(service).toBeDefined()
    })

    it('creates anew user with a salted and hashed password', async () => {
        const user = await service.signUp('test@gmail.com', 'asdf')

        expect(user.password).not.toEqual('asdf')
        const [salt, hash] = user.password.split('.')
        expect(salt).toBeDefined()
        expect(hash).toBeDefined()
    })
    it('throws an error if user signs up with email that is in use', async () => {
        fakeUsersService.find = () => Promise.resolve([{ id: 1, email: 'a', password: '1' } as User]);

        await expect(service.signUp('asdf@asdf.com', 'asdf')).rejects.toThrow(
            BadRequestException,
        )
    })
    it('throws if signin is called with an unused email', async () => {
        await expect(
            service.signIn('asdflkj@asdlfkj.com', 'passdflkj'),
        ).rejects.toThrow(NotFoundException);
    });

    it('throws if an invalid password is provided', async () => {
        fakeUsersService.find = () =>
            Promise.resolve([
                { email: 'asdf@asdf.com', password: 'laskdjf' } as User,
            ]);
        await expect(
            service.signIn('laskdjf@alskdfj.com', 'passowrd'),
        ).rejects.toThrow(BadRequestException);
    });

    it('returns a user when passwords match', async () => {
        fakeUsersService.find = () =>
            Promise.resolve([
                { email: 'asdf@asdf.com', password: '5f9c95b4fa003255.258938d7f9def3c72e81c87dfe033856640c6f299f7deb751f7525676996df6c' } as User,
            ]);

        const user = await service.signIn('laskdjf@alskdfj.com', 'laskdjf')
        expect(user).toBeDefined()
    });
})



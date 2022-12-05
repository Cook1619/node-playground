import { Test } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { User } from './users.entity';
import { UsersService } from './users.service';


it('can create an instance of the auth service', async () => {
    // Create fake copy of user service
    // By typing this were ensuring all these methods have the correct type signature
    const fakeUserService: Partial<UsersService> = {
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
                useValue: fakeUserService
            }
        ]
    }).compile();
    const service = module.get(AuthService);
    expect(service).toBeDefined()
})
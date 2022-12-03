import { AuthService } from './auth.service';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';

@Controller('auth')
// The serializer can now take in whatever dto shape we need
// This is applying to all routes on this controller
// If you wanted it on a per route basis aka an admin route that exposes diff data, you would created another DTO to expose to props on a particular route
@Serialize(UserDto)
export class UsersController {
    constructor(private usersService: UsersService, private authService: AuthService) { }
    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        return this.authService.signUp(body.email, body.password);
    }

    @Post('/signin')
    signIn(@Body() body: CreateUserDto) {
        return this.authService.signIn(body.email, body.password)
    }

    @Get('/:id')
    async findUser(@Param('id') id: string) {
        const user = await this.usersService.findOne(Number(id));
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    @Get()
    findAllUser(@Query('email') email: string) {
        return this.usersService.find(email);
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.usersService.update(Number(id), body);
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        this.usersService.remove(Number(id));
    }
}

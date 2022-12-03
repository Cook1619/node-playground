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
    UseInterceptors,
    ClassSerializerInterceptor,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('auth')
export class UsersController {
    constructor(private usersService: UsersService) { }
    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        return this.usersService.create(body.email, body.password);
    }

    // This is the second part to intercept the res the password out
    @UseInterceptors(ClassSerializerInterceptor)
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

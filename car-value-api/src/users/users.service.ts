import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity'

@Injectable()
export class UsersService {
    // Arg name repo
    // Abbreviated repo for the usersReposity 
    // Private allows us to shorthand property definition and assignment
    // repo: Repository<User> means instance of a typeorm repo that deals with users
    // @InjectRepository tells DI that we need the user repo
    constructor(@InjectRepository(User) private repo: Repository<User>) { }
    create(email: string, password: string) {
        //Does not save, creates a user entity instance with email and password
        //We do this because we can add validation in the entity file as well
        const user = this.repo.create({ email, password })
        //Takes the entity data and persist the save
        return this.repo.save(user)
    }
}

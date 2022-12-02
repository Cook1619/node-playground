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
        //Hooks will run doing it this way, calling repo.save({ email, password }) will not call hooks
        const user = this.repo.create({ email, password })
        //Takes the entity data and persist the save
        return this.repo.save(user)
    }

    findOne(id: number) {
        return this.repo.findOneBy({ id })
    }

    find(email: string) {
        return this.repo.find({ where: { email } })
    }

    async update(id: number, attrs: Partial<User>) {
        const user = await this.findOne(id);
        if (!user) {
            throw new Error('User not found')
        }
        Object.assign(user, attrs);
        return this.repo.save(user)
    }

    async remove(id: number) {
        const user = await this.findOne(id);
        if (!user) {
            throw new Error('User not found')
        }
        return this.repo.remove(user)
    }
}

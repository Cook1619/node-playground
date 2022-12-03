import { BadRequestException, Injectable } from "@nestjs/common";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { UsersService } from "./users.service";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }

    async signUp(email: string, password: string) {
        const users = await this.usersService.find(email)
        if (users.length) {
            throw new BadRequestException(`User with email ${email} already has an account`)
        }
        // Salting and hashing the password
        const salt = randomBytes(8).toString('hex')
        // TS has no idea what promisify returns so we help it out
        const hash = (await scrypt(password, salt, 32)) as Buffer
        const result = `${salt}.${hash.toString('hex')}`

        const user = await this.usersService.create(email, result);
        return user;
    }

    signIn() { }
}
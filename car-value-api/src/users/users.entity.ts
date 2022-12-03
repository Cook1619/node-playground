import { AfterInsert, AfterRemove, AfterUpdate, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { Exclude } from 'class-transformer';
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    // This is exclude the pass from res along with interceptor in controller
    @Column()
    @Exclude()
    password: string;

    //these are hooks that will run after the corresponding method is ran
    @AfterInsert()
    logInsert() {
        console.log(`Inserted user with id ${this.id} email address ${this.email}`)
    }

    @AfterUpdate()
    logUpdate() {
        console.log(`Updated user with id ${this.id} email address ${this.email}`)
    }

    @AfterRemove()
    logRemove() {
        console.log(`Removed user with id ${this.id} email address ${this.email}`)
    }
}
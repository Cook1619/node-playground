import { User } from '../users/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  long: number;

  @Column()
  lat: number;

  @Column()
  mileage: number;

  // If we were to log User outside this class it could potentially be undefined
  // This is because of the order of the code being executed and the circular dependancy
  // This is the way nest handles this, we resolve of type user with a function
  // Second arguement is all about taking an instance of user, and how to get to a report
  @ManyToOne(() => User, (user) => user.reports)
  user: User;

  @Column({ default: false })
  approved: boolean;
}

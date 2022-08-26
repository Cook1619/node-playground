import { loggerMiddleware } from './../../common/middleware/logger.middleware';
import { CoffeeType } from './../../common/enums/coffee-type.enum';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Flavor } from './flavor.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Drink } from 'src/common/interfaces/drink.interface';
@Entity()
@ObjectType({ description: 'Coffee Model', implements: () => Drink })
export class Coffee implements Drink {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'A unique identifier' })
  id: number;

  @Field({ middleware: [loggerMiddleware] })
  @Column()
  name: string;

  @Column()
  brand: string;

  @JoinTable()
  @ManyToMany(() => Flavor, (flavor) => flavor.coffees, {
    cascade: true,
  })
  flavors?: Flavor[];

  @CreateDateColumn()
  createdAt?: Date;

  @Column({ nullable: true })
  type: CoffeeType;
}

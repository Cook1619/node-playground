import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
@ObjectType({ description: 'Coffee Model' })
export class Coffee {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'A unique identifier' })
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column({ type: 'json' })
  flavors: string[];
}

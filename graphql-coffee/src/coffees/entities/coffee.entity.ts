import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Coffee Model' })
export class Coffee {
  @Field(() => ID, { description: 'A unique identifier' })
  id: number;
  name: string;
  brand: string;
  flavors: string[];
}

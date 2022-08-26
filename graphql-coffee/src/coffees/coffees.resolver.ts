import { ParseIntPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeInput } from './dto/create-coffee.input';
import { Coffee } from './entities/coffee.entity';

@Resolver()
export class CoffeesResolver {
  constructor(private readonly coffeesService: CoffeesService) {}
  @Query(() => [Coffee], { name: 'coffees' })
  async findAll() {
    return this.coffeesService.findAll();
  }

  @Query(() => Coffee, { name: 'coffee' })
  async findOne(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.coffeesService.findOne(id);
  }

  @Mutation(() => Coffee, { name: 'createCoffee' })
  async create(
    @Args('createCoffeeInput') createCoffeeInput: CreateCoffeeInput,
  ) {
    return this.coffeesService.create(createCoffeeInput);
  }
}

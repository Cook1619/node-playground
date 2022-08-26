import { PubSub } from 'graphql-subscriptions';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeInput } from './dto/create-coffee.input';
import { UpdateCoffeeInput } from './dto/update-coffee.input';
import { Coffee } from './entities/coffee.entity';
export declare class CoffeesResolver {
    private readonly coffeesService;
    private readonly pubSub;
    constructor(coffeesService: CoffeesService, pubSub: PubSub);
    findAll(): Promise<Coffee[]>;
    findOne(id: number): Promise<Coffee>;
    create(createCoffeeInput: CreateCoffeeInput): Promise<Coffee>;
    update(id: number, updateCoffeeInput: UpdateCoffeeInput): Promise<Coffee>;
    remove(id: number): Promise<Coffee>;
    coffeeAdded(): AsyncIterator<unknown, any, undefined>;
}

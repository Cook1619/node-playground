import { PubSub } from 'graphql-subscriptions';
import { Repository } from 'typeorm';
import { CreateCoffeeInput } from './dto/create-coffee.input';
import { UpdateCoffeeInput } from './dto/update-coffee.input';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
export declare class CoffeesService {
    private readonly coffeesRepository;
    private readonly flavorsRepository;
    private readonly pubSub;
    constructor(coffeesRepository: Repository<Coffee>, flavorsRepository: Repository<Flavor>, pubSub: PubSub);
    findAll(): Promise<Coffee[]>;
    findOne(id: number): Promise<Coffee>;
    create(createCoffeeInput: CreateCoffeeInput): Promise<Coffee>;
    update(id: number, updateCoffeeInput: UpdateCoffeeInput): Promise<Coffee>;
    remove(id: number): Promise<Coffee>;
    private preloadFlavorByName;
}

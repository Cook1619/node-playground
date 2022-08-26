import { Repository } from 'typeorm';
import { CreateCoffeeInput } from './dto/create-coffee.input';
import { Coffee } from './entities/coffee.entity';
export declare class CoffeesService {
    private readonly coffeesRepository;
    constructor(coffeesRepository: Repository<Coffee>);
    findAll(): Promise<Coffee[]>;
    findOne(id: number): Promise<Coffee>;
    create(createCoffeeInput: CreateCoffeeInput): Promise<Coffee>;
}

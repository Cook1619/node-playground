import { Repository } from 'typeorm';
import { CreateCoffeeInput } from './dto/create-coffee.input';
import { UpdateCoffeeInput } from './dto/update-coffee.input';
import { Coffee } from './entities/coffee.entity';
export declare class CoffeesService {
    private readonly coffeesRepository;
    constructor(coffeesRepository: Repository<Coffee>);
    findAll(): Promise<Coffee[]>;
    findOne(id: number): Promise<Coffee>;
    create(createCoffeeInput: CreateCoffeeInput): Promise<Coffee>;
    update(id: number, updateCoffeeInput: UpdateCoffeeInput): Promise<Coffee>;
    remove(id: number): Promise<Coffee>;
}

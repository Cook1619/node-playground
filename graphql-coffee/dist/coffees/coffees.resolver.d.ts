import { CoffeesService } from './coffees.service';
import { CreateCoffeeInput } from './dto/create-coffee.input';
import { Coffee } from './entities/coffee.entity';
export declare class CoffeesResolver {
    private readonly coffeesService;
    constructor(coffeesService: CoffeesService);
    findAll(): Promise<Coffee[]>;
    findOne(id: number): Promise<Coffee>;
    create(createCoffeeInput: CreateCoffeeInput): Promise<Coffee>;
}

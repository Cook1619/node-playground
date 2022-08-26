import { CoffeesService } from './coffees.service';
import { CreateCoffeeInput } from './dto/create-coffee.input';
export declare class CoffeesResolver {
    private readonly coffeesService;
    constructor(coffeesService: CoffeesService);
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<any>;
    create(createCoffeeInput: CreateCoffeeInput): Promise<any>;
}

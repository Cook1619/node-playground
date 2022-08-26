import { CreateCoffeeInput } from './dto/create-coffee.input';
export declare class CoffeesService {
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<any>;
    create(createCoffeeInput: CreateCoffeeInput): Promise<any>;
}

import DataLoader from 'dataloader';
import { Repository } from 'typeorm';
import { Coffee } from '../entities/coffee.entity';
import { Flavor } from '../entities/flavor.entity';
export declare class FlavorsByCoffeeLoader extends DataLoader<number, Flavor[]> {
    private readonly coffeesRepository;
    constructor(coffeesRepository: Repository<Coffee>);
    private batchLoadFn;
}

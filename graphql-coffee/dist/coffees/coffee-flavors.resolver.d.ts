import { Flavor } from './entities/flavor.entity';
import { FlavorsByCoffeeLoader } from './data-loader/flavors-by-coffee.loader';
import { Coffee } from './entities/coffee.entity';
export declare class CoffeeFlavorsResolver {
    private readonly flavorsByCoffeeLoader;
    constructor(flavorsByCoffeeLoader: FlavorsByCoffeeLoader);
    getFlavorsOfCoffee(coffee: Coffee): Promise<Flavor[]>;
}

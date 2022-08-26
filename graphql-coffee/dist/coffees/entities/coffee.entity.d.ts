import { CoffeeType } from './../../common/enums/coffee-type.enum';
import { Flavor } from './flavor.entity';
import { Drink } from 'src/common/interfaces/drink.interface';
export declare class Coffee implements Drink {
    id: number;
    name: string;
    brand: string;
    flavors?: Flavor[];
    createdAt?: Date;
    type: CoffeeType;
}

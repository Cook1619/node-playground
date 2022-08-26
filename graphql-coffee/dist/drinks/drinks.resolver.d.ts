import { DrinksResultUnion } from 'src/common/unions/drinks-result.union';
export declare class DrinksResolver {
    findAll(): Promise<typeof DrinksResultUnion[]>;
}

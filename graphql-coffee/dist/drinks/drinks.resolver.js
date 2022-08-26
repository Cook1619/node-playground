"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrinksResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const coffee_entity_1 = require("../coffees/entities/coffee.entity");
const drinks_result_union_1 = require("../common/unions/drinks-result.union");
const tea_entity_1 = require("../teas/entities/tea.entity");
let DrinksResolver = class DrinksResolver {
    async findAll() {
        const coffee = new coffee_entity_1.Coffee();
        coffee.id = 1;
        coffee.name = 'Colombia';
        coffee.brand = 'Black Crow Coffee';
        const tea = new tea_entity_1.Tea();
        tea.name = 'Lipton';
        return [tea, coffee];
    }
};
__decorate([
    (0, graphql_1.Query)(() => [drinks_result_union_1.DrinksResultUnion], { name: 'drinks' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DrinksResolver.prototype, "findAll", null);
DrinksResolver = __decorate([
    (0, graphql_1.Resolver)('Drink')
], DrinksResolver);
exports.DrinksResolver = DrinksResolver;
//# sourceMappingURL=drinks.resolver.js.map
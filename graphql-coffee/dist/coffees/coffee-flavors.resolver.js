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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoffeeFlavorsResolver = void 0;
const flavor_entity_1 = require("./entities/flavor.entity");
const graphql_1 = require("@nestjs/graphql");
const flavors_by_coffee_loader_1 = require("./data-loader/flavors-by-coffee.loader");
const coffee_entity_1 = require("./entities/coffee.entity");
let CoffeeFlavorsResolver = class CoffeeFlavorsResolver {
    constructor(flavorsByCoffeeLoader) {
        this.flavorsByCoffeeLoader = flavorsByCoffeeLoader;
    }
    async getFlavorsOfCoffee(coffee) {
        return this.flavorsByCoffeeLoader.load(coffee.id);
    }
};
__decorate([
    (0, graphql_1.ResolveField)('flavors', () => [flavor_entity_1.Flavor]),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [coffee_entity_1.Coffee]),
    __metadata("design:returntype", Promise)
], CoffeeFlavorsResolver.prototype, "getFlavorsOfCoffee", null);
CoffeeFlavorsResolver = __decorate([
    (0, graphql_1.Resolver)(() => coffee_entity_1.Coffee),
    __metadata("design:paramtypes", [flavors_by_coffee_loader_1.FlavorsByCoffeeLoader])
], CoffeeFlavorsResolver);
exports.CoffeeFlavorsResolver = CoffeeFlavorsResolver;
//# sourceMappingURL=coffee-flavors.resolver.js.map
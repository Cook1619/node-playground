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
exports.CoffeesResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const coffees_service_1 = require("./coffees.service");
const create_coffee_input_1 = require("./dto/create-coffee.input");
const update_coffee_input_1 = require("./dto/update-coffee.input");
const coffee_entity_1 = require("./entities/coffee.entity");
let CoffeesResolver = class CoffeesResolver {
    constructor(coffeesService, pubSub) {
        this.coffeesService = coffeesService;
        this.pubSub = pubSub;
    }
    async findAll() {
        return this.coffeesService.findAll();
    }
    async findOne(id) {
        return this.coffeesService.findOne(id);
    }
    async create(createCoffeeInput) {
        return this.coffeesService.create(createCoffeeInput);
    }
    async update(id, updateCoffeeInput) {
        return this.coffeesService.update(id, updateCoffeeInput);
    }
    async remove(id) {
        return this.coffeesService.remove(id);
    }
    coffeeAdded() {
        return this.pubSub.asyncIterator('coffeeAdded');
    }
};
__decorate([
    (0, graphql_1.Query)(() => [coffee_entity_1.Coffee], { name: 'coffees' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CoffeesResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => coffee_entity_1.Coffee, { name: 'coffee' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID }, common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CoffeesResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => coffee_entity_1.Coffee, { name: 'createCoffee' }),
    __param(0, (0, graphql_1.Args)('createCoffeeInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_coffee_input_1.CreateCoffeeInput]),
    __metadata("design:returntype", Promise)
], CoffeesResolver.prototype, "create", null);
__decorate([
    (0, graphql_1.Mutation)(() => coffee_entity_1.Coffee, { name: 'updateCoffee' }),
    __param(0, (0, graphql_1.Args)('id', common_1.ParseIntPipe)),
    __param(1, (0, graphql_1.Args)('updateCoffeeInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_coffee_input_1.UpdateCoffeeInput]),
    __metadata("design:returntype", Promise)
], CoffeesResolver.prototype, "update", null);
__decorate([
    (0, graphql_1.Mutation)(() => coffee_entity_1.Coffee, { name: 'removeCoffee' }),
    __param(0, (0, graphql_1.Args)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CoffeesResolver.prototype, "remove", null);
__decorate([
    (0, graphql_1.Subscription)(() => coffee_entity_1.Coffee),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CoffeesResolver.prototype, "coffeeAdded", null);
CoffeesResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [coffees_service_1.CoffeesService,
        graphql_subscriptions_1.PubSub])
], CoffeesResolver);
exports.CoffeesResolver = CoffeesResolver;
//# sourceMappingURL=coffees.resolver.js.map
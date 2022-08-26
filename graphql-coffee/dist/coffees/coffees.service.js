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
exports.CoffeesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const apollo_server_express_1 = require("apollo-server-express");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const typeorm_2 = require("typeorm");
const coffee_entity_1 = require("./entities/coffee.entity");
const flavor_entity_1 = require("./entities/flavor.entity");
let CoffeesService = class CoffeesService {
    constructor(coffeesRepository, flavorsRepository, pubSub) {
        this.coffeesRepository = coffeesRepository;
        this.flavorsRepository = flavorsRepository;
        this.pubSub = pubSub;
    }
    async findAll() {
        return this.coffeesRepository.find();
    }
    async findOne(id) {
        const coffee = await this.coffeesRepository.findOne({ where: { id } });
        if (!coffee) {
            throw new apollo_server_express_1.UserInputError(`Coffee #${id} does not exist`);
        }
        return coffee;
    }
    async create(createCoffeeInput) {
        const flavors = await Promise.all(createCoffeeInput.flavors.map((name) => this.preloadFlavorByName(name)));
        const coffee = this.coffeesRepository.create(Object.assign(Object.assign({}, createCoffeeInput), { flavors }));
        const newCoffeeEntity = await this.coffeesRepository.save(coffee);
        this.pubSub.publish('coffeeAdded', { coffeeAdded: newCoffeeEntity });
        return newCoffeeEntity;
    }
    async update(id, updateCoffeeInput) {
        const flavors = updateCoffeeInput.flavors &&
            (await Promise.all(updateCoffeeInput.flavors.map((name) => this.preloadFlavorByName(name))));
        const coffee = await this.coffeesRepository.preload(Object.assign(Object.assign({ id }, updateCoffeeInput), { flavors }));
        if (!coffee) {
            throw new apollo_server_express_1.UserInputError(`Coffee #${id} does not exist`);
        }
        return this.coffeesRepository.save(coffee);
    }
    async remove(id) {
        const coffee = await this.findOne(id);
        return this.coffeesRepository.remove(coffee);
    }
    async preloadFlavorByName(name) {
        const existingFlavor = await this.flavorsRepository.findOne({
            where: { name },
        });
        if (existingFlavor) {
            return existingFlavor;
        }
        return this.flavorsRepository.create({ name });
    }
};
CoffeesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(coffee_entity_1.Coffee)),
    __param(1, (0, typeorm_1.InjectRepository)(flavor_entity_1.Flavor)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        graphql_subscriptions_1.PubSub])
], CoffeesService);
exports.CoffeesService = CoffeesService;
//# sourceMappingURL=coffees.service.js.map
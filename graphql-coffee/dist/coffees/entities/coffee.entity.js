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
exports.Coffee = void 0;
const eager_import_0 = require("./flavor.entity");
const graphql_1 = require("@nestjs/graphql");
const flavor_entity_1 = require("./flavor.entity");
const typeorm_1 = require("typeorm");
const drink_interface_1 = require("../../common/interfaces/drink.interface");
let Coffee = class Coffee {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, name: { type: () => String }, brand: { type: () => String }, flavors: { nullable: true, type: () => [require("./flavor.entity").Flavor] }, createdAt: { nullable: true, type: () => Date } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, graphql_1.Field)(() => graphql_1.ID, { description: 'A unique identifier' }),
    __metadata("design:type", Number)
], Coffee.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Coffee.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Coffee.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.JoinTable)(),
    (0, typeorm_1.ManyToMany)(() => flavor_entity_1.Flavor, (flavor) => flavor.coffees, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Coffee.prototype, "flavors", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Coffee.prototype, "createdAt", void 0);
Coffee = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.ObjectType)({ description: 'Coffee Model', implements: () => drink_interface_1.Drink })
], Coffee);
exports.Coffee = Coffee;
//# sourceMappingURL=coffee.entity.js.map
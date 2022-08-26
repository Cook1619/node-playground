"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrinksResultUnion = void 0;
const graphql_1 = require("@nestjs/graphql");
const coffee_entity_1 = require("../../coffees/entities/coffee.entity");
const tea_entity_1 = require("../../teas/entities/tea.entity");
exports.DrinksResultUnion = (0, graphql_1.createUnionType)({
    name: 'DrinksResult',
    types: () => [coffee_entity_1.Coffee, tea_entity_1.Tea],
});
//# sourceMappingURL=drinks-result.union.js.map
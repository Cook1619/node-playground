"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoffeeType = void 0;
const graphql_1 = require("@nestjs/graphql");
var CoffeeType;
(function (CoffeeType) {
    CoffeeType["ARABICA"] = "Arabica";
    CoffeeType["ROBUSTA"] = "Robusta";
})(CoffeeType = exports.CoffeeType || (exports.CoffeeType = {}));
(0, graphql_1.registerEnumType)(CoffeeType, {
    name: 'CoffeeType',
});
//# sourceMappingURL=coffee-type.enum.js.map
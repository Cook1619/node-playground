"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = void 0;
const loggerMiddleware = async (ctx, next) => {
    const value = await next();
    console.log(value);
    return value === null || value === void 0 ? void 0 : value.toUpperCase();
};
exports.loggerMiddleware = loggerMiddleware;
//# sourceMappingURL=logger.middleware.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const orderByDirection_1 = require("../shared/enumerators/orderByDirection");
class BaseController {
    getDirection(_direction) {
        try {
            switch (_direction.toLowerCase()) {
                case 'desc':
                    return orderByDirection_1.OrderByDirection.desc;
                default:
                    return orderByDirection_1.OrderByDirection.asc;
            }
        }
        catch (err) {
            return orderByDirection_1.OrderByDirection.desc;
        }
    }
}
exports.BaseController = BaseController;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeId = void 0;
const Entity_1 = require("@backend/shared/domain/Entity");
class EmployeeId extends Entity_1.Entity {
    get id() {
        return this._id;
    }
    constructor(id) {
        super(null, id);
    }
    static create(id) {
        return new EmployeeId(id);
    }
}
exports.EmployeeId = EmployeeId;

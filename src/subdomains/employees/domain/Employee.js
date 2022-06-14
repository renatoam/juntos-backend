"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
const Entity_1 = require("../../shared/domain/Entity");
const UniqueEntityID_1 = require("../../shared/domain/UniqueEntityID");
const EmployeeId_1 = require("./EmployeeId");
class Employee extends Entity_1.Entity {
    get id() {
        return EmployeeId_1.EmployeeId.create(this._id).id;
    }
    get name() {
        return this.props.name;
    }
    get email() {
        return this.props.email;
    }
    get occupation() {
        return this.props.occupation;
    }
    get birthday() {
        return this.props.birthday;
    }
    get hire() {
        return this.props.hire;
    }
    constructor(props, id) {
        super(props, id);
    }
    // Implement Result class
    static create(props, id) {
        // Implement guardAgainstNullOrUndefined
        if (!props.name || !props.email)
            return 'Name and email cannot be null';
        const employeeId = id ? id : new UniqueEntityID_1.UniqueEntityID();
        return new Employee(props, employeeId);
    }
}
exports.Employee = Employee;

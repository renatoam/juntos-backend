"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeName = void 0;
const ValueObject_1 = require("@backend/shared/domain/ValueObject");
const MAX_LENGTH_ALLOWED = 15;
const MIN_LENGTH_ALLOWED = 2;
class EmployeeName extends ValueObject_1.ValueObject {
    constructor(props) {
        super(props);
    }
    get value() {
        return this.props.name;
    }
    static create(props) {
        if (!props.name)
            return 'Please, you need inform a name';
        if (props.name.length > this.maxLength)
            return `Name could not exceed ${this.maxLength} characters`;
        if (props.name.length < this.minLength)
            return `Name shoud have at least ${this.minLength} characters`;
        return new EmployeeName(props);
    }
}
exports.EmployeeName = EmployeeName;
EmployeeName.maxLength = MAX_LENGTH_ALLOWED;
EmployeeName.minLength = MIN_LENGTH_ALLOWED;

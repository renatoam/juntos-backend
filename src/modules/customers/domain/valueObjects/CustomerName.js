"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerName = void 0;
const ValueObject_1 = require("../../../shared/domain/ValueObject");
class CustomerName extends ValueObject_1.ValueObject {
    constructor(props) {
        super(props);
    }
    get fullname() {
        return `${this.props.title} ${this.props.first} ${this.props.last}`;
    }
    get firstname() {
        return this.props.first;
    }
    get lastname() {
        return this.props.last;
    }
    static create(props) {
        const { title, first, last } = props;
        const firstname = !!first;
        const lastname = !!last;
        if (title && !this.titles.includes(title))
            return null;
        if (!firstname || !lastname)
            return null;
        if (first.length < this.minLength || last.length < this.minLength)
            return null;
        if (first.length > this.maxLength || last.length > this.maxLength)
            return null;
        return new CustomerName(props);
    }
}
exports.CustomerName = CustomerName;
CustomerName.maxLength = 15;
CustomerName.minLength = 2;
CustomerName.titles = ['miss', 'ms', 'mister', 'mr', 'mrs'];

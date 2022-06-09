"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerEmail = void 0;
const ValueObject_1 = require("../../../shared/domain/ValueObject");
class CustomerEmail extends ValueObject_1.ValueObject {
    constructor(props) {
        super(props);
    }
    get value() {
        return this.props.value;
    }
    static isValidEmail(email) {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    }
    static format(email) {
        return email.trim().toLowerCase();
    }
    static create(email) {
        if (!this.isValidEmail(email))
            return null;
        return new CustomerEmail({ value: this.format(email) });
    }
}
exports.CustomerEmail = CustomerEmail;

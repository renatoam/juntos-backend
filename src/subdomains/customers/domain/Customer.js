"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const Entity_1 = require("../../shared/domain/Entity");
class Customer extends Entity_1.Entity {
    get gender() {
        return this.props.gender;
    }
    get name() {
        return this.props.name;
    }
    get location() {
        return this.props.location;
    }
    get email() {
        return this.props.email;
    }
    get dob() {
        return this.props.dob;
    }
    get registered() {
        return this.props.registered;
    }
    get phone() {
        return this.props.phone;
    }
    get cell() {
        return this.props.cell;
    }
    get picture() {
        return this.props.picture;
    }
    constructor(props, id) {
        super(props, id);
    }
    static create(props, id) {
        const { name, email } = props;
        const customerName = !!name;
        const customerEmail = !!email;
        if (!customerName || !customerEmail)
            return null;
        return new Customer(props, id);
    }
}
exports.Customer = Customer;

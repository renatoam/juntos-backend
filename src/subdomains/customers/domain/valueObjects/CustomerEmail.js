"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.CustomerEmail = void 0;
var ValueObject_1 = require("../../../../shared/domain/ValueObject");
var CustomerEmail = /** @class */ (function (_super) {
    __extends(CustomerEmail, _super);
    function CustomerEmail(props) {
        return _super.call(this, props) || this;
    }
    Object.defineProperty(CustomerEmail.prototype, "value", {
        get: function () {
            return this.props.value;
        },
        enumerable: false,
        configurable: true
    });
    CustomerEmail.isValidEmail = function (email) {
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    };
    CustomerEmail.format = function (email) {
        return email.trim().toLowerCase();
    };
    CustomerEmail.create = function (email) {
        if (!this.isValidEmail(email))
            return null;
        return new CustomerEmail({ value: this.format(email) });
    };
    return CustomerEmail;
}(ValueObject_1.ValueObject));
exports.CustomerEmail = CustomerEmail;

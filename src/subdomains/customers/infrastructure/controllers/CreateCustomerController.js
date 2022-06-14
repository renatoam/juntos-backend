"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCustomerController = void 0;
const BaseController_1 = require("../../../employees/adapters/controllers/BaseController");
class CreateCustomerController extends BaseController_1.Controller {
    constructor(useCase) {
        super();
        this.useCase = useCase;
    }
    handle() {
        return __awaiter(this, void 0, void 0, function* () {
            const dto = this.request.body;
            return '';
            // try {
            //   const result = await this.useCase.execute(dto);
            //   if (result.isLeft()) {
            //     const error = result.value;
            //     switch (error.constructor) {
            //       case CreateUserErrors.AccountAlreadyExists:
            //         return this.conflict(error.errorValue().message)
            //       default:
            //         return this.fail(error.errorValue().message);
            //     }
            //   } else {
            //     return this.ok(this.res);
            //   }
            // } catch (err) {
            //   return this.fail(err)
            // }
        });
    }
}
exports.CreateCustomerController = CreateCustomerController;

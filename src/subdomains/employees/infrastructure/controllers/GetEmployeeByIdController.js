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
exports.GetEmployeeByIdController = void 0;
const constants_1 = require("../constants");
class GetEmployeeByIdController {
    constructor(useCase) {
        this.useCase = useCase;
    }
    run(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestQuery = request.query;
            try {
                const employee = yield this.useCase.execute(requestQuery);
                response.status(200).json({ employee });
            }
            catch (error) {
                throw new Error(constants_1.RETRIEVE_EMPLOYEE_ERROR);
            }
        });
    }
}
exports.GetEmployeeByIdController = GetEmployeeByIdController;

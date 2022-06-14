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
exports.GetEmployeeByIdUseCase = void 0;
const constants_1 = require("../../infrastructure/constants");
class GetEmployeeByIdUseCase {
    constructor(getEmployeesRepository) {
        this.getEmployeesRepository = getEmployeesRepository;
    }
    execute(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.getEmployeesRepository.getEmployeeById(request);
            }
            catch (error) {
                throw new Error(constants_1.INVALID_REQUEST_WITH_ID);
            }
        });
    }
}
exports.GetEmployeeByIdUseCase = GetEmployeeByIdUseCase;

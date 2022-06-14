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
exports.CreateEmployeeUseCase = void 0;
const types_1 = require("@backend/shared/types");
class CreateEmployeeUseCase {
    constructor(saveEmployeeRepository) {
        this.saveEmployeeRepository = saveEmployeeRepository;
    }
    execute(request) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.saveEmployeeRepository.saveEmployee(request, types_1.RequestMethods.POST);
        });
    }
}
exports.CreateEmployeeUseCase = CreateEmployeeUseCase;

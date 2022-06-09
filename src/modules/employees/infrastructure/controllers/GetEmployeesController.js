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
exports.GetEmployeesController = void 0;
const constants_1 = require("../constants");
class GetEmployeesController {
    constructor(getAllEmployeesUseCase, getManyEmployeesUseCase) {
        this.getAllEmployeesUseCase = getAllEmployeesUseCase;
        this.getManyEmployeesUseCase = getManyEmployeesUseCase;
    }
    run(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = request.query;
            const IsThereFilter = !!Object.keys(filter).length;
            try {
                let employees;
                if (IsThereFilter)
                    employees = yield this.getManyEmployeesUseCase.execute(filter);
                else
                    employees = yield this.getAllEmployeesUseCase.execute();
                return response.status(200).json(employees);
            }
            catch (error) {
                return response.status(500).json({
                    error,
                    description: constants_1.RETRIEVE_EMPLOYEES_ERROR,
                });
            }
        });
    }
}
exports.GetEmployeesController = GetEmployeesController;

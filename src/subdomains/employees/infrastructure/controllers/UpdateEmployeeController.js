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
exports.UpdateEmployeeController = void 0;
const constants_1 = require("../constants");
class UpdateEmployeeController {
    constructor(updateEmployeeUseCase, getEmployeeByEmail, checkEmployeeUseCase) {
        this.updateEmployeeUseCase = updateEmployeeUseCase;
        this.getEmployeeByEmail = getEmployeeByEmail;
        this.checkEmployeeUseCase = checkEmployeeUseCase;
    }
    run(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestBody = request.body;
            const { id } = request.query;
            const checkDTO = {
                id,
                email: requestBody.email
            };
            const getByEmailDTO = {
                email: requestBody.email
            };
            const updateEmployeeDTO = {
                id,
                name: requestBody.name,
                email: requestBody.email,
                occupation: requestBody.occupation,
                birthday: requestBody.birthday,
                hire: requestBody.hire,
            };
            const employeeExists = yield this.checkEmployeeUseCase.execute(checkDTO);
            if (!employeeExists)
                return response.status(400).json({ message: constants_1.EMPLOYEE_DOESNT_EXIST });
            try {
                try {
                    yield this.updateEmployeeUseCase.execute(updateEmployeeDTO);
                }
                catch (error) {
                    return response.status(500).json(constants_1.UPDATE_EMPLOYEE);
                }
                const employee = yield this.getEmployeeByEmail.execute(getByEmailDTO);
                return response.status(200).json(employee);
            }
            catch (error) {
                return response.status(500).json(constants_1.RETRIEVE_EMPLOYEE_ERROR);
            }
        });
    }
}
exports.UpdateEmployeeController = UpdateEmployeeController;

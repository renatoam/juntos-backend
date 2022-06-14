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
exports.CreateEmployeeController = void 0;
const constants_1 = require("../constants");
class CreateEmployeeController {
    constructor(createEmployeeUseCase, getEmployeeByEmailUseCase, checkEmployeeUseCase) {
        this.createEmployeeUseCase = createEmployeeUseCase;
        this.getEmployeeByEmailUseCase = getEmployeeByEmailUseCase;
        this.checkEmployeeUseCase = checkEmployeeUseCase;
    }
    run(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            if (request.method !== 'POST') {
                return response.status(405).send({ message: constants_1.ONLY_POST_METHOD });
            }
            const body = request.body;
            const employeeExists = yield this.checkEmployeeUseCase.execute(body);
            const getEmployeeDTO = {
                email: body.email
            };
            if (employeeExists) {
                try {
                    const employee = yield this.getEmployeeByEmailUseCase.execute(getEmployeeDTO);
                    return response.status(200).json({
                        message: constants_1.EMPLOYEE_EXISTS,
                        employee
                    });
                }
                catch (error) {
                    return response.status(500).json({ message: constants_1.RETRIEVE_ONCREATE_EMPLOYEE_ERROR });
                }
            }
            try {
                try {
                    yield this.createEmployeeUseCase.execute(body);
                }
                catch (error) {
                    return response.status(500).json({ message: constants_1.CREATE_EMPLOYEE_ERROR });
                }
                const employee = yield this.getEmployeeByEmailUseCase.execute(getEmployeeDTO);
                return response.status(200).json(employee);
            }
            catch (error) {
                return response.status(500).json({ message: constants_1.RETRIEVE_ONCREATE_EMPLOYEE_ERROR });
            }
        });
    }
}
exports.CreateEmployeeController = CreateEmployeeController;

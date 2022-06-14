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
const index_1 = require("../../index");
describe('[Use Case] Check Employee', () => {
    it('should be a test', () => __awaiter(void 0, void 0, void 0, function* () {
        const checkEmployeeDTO = {
            id: 1,
            email: 'test@outlook.com'
        };
        const employeeExists = yield index_1.checkIfEmployeeExistsUseCase.execute(checkEmployeeDTO);
        expect(employeeExists).toBe(true);
    }));
});

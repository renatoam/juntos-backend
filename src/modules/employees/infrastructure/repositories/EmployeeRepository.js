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
exports.EmployeeRepository = void 0;
const Helpers_1 = require("../../../shared/infrastructure/Helpers");
const types_1 = require("../../../shared/types");
const constants_1 = require("../constants");
class EmployeeRepository {
    constructor() {
        this.helper = new Helpers_1.Helper();
    }
    getEmployeeFromRemote(id, searchKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const remoteEmployees = yield this.helper.getDataFromRemote(constants_1.BASE_URL);
            return this.helper.findFromAList(remoteEmployees, id.toString(), searchKey);
        });
    }
    getEmployeeFromCache(id, searchKey) {
        const cachedEmployees = this.helper.getDataFromCache(constants_1.CACHE_KEY);
        return this.helper.findFromAList(cachedEmployees, id.toString(), searchKey);
    }
    getEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.helper.isCached(constants_1.CACHE_KEY))
                return this.helper.getDataFromCache(constants_1.CACHE_KEY);
            const employees = yield this.helper.getDataFromRemote(constants_1.BASE_URL);
            this.helper.saveMassiveToCache(employees, constants_1.CACHE_KEY);
            return employees;
        });
    }
    getEmployeeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.helper.isCached(constants_1.CACHE_KEY))
                return this.getEmployeeFromCache(id, types_1.SearchKey.id);
            return this.getEmployeeFromRemote(id, types_1.SearchKey.id);
        });
    }
    getEmployeeByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.helper.isCached(constants_1.CACHE_KEY))
                return this.getEmployeeFromCache(email, types_1.SearchKey.email);
            return this.getEmployeeFromRemote(email, types_1.SearchKey.email);
        });
    }
    getAllEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getEmployees();
        });
    }
    getManyEmployees(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            let employees = yield this.getEmployees();
            const { name, occupation, birthday, hire, limit, offset } = filter;
            if (name)
                employees = employees.filter(employee => employee.name.includes(name));
            if (occupation)
                employees = employees.filter(employee => employee.occupation.includes(occupation));
            if (birthday) {
                const fieldCondition = birthday.toString().split(':');
                const operator = fieldCondition[0];
                const value = fieldCondition[1];
                if (operator === 'eq')
                    employees = employees.filter(employee => employee.birthday === value);
                if (operator === 'gt')
                    employees = employees.filter(employee => employee.birthday > value);
                if (operator === 'lt')
                    employees = employees.filter(employee => employee.birthday < value);
            }
            if (hire) {
                const fieldCondition = hire.toString().split(':');
                const operator = fieldCondition[0];
                const value = fieldCondition[1];
                if (operator === 'eq')
                    employees = employees.filter(employee => employee.hire === value);
                if (operator === 'gt')
                    employees = employees.filter(employee => employee.hire > value);
                if (operator === 'lt')
                    employees = employees.filter(employee => employee.hire < value);
            }
            if (!limit && offset) {
                const startIndex = offset + 1;
                employees = employees.slice(startIndex, (startIndex) + limit);
            }
            return employees;
        });
    }
    checkEmployee(searchItem, searchKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const employees = yield this.getEmployees();
            const employee = this.helper.findFromAList(employees, searchItem, searchKey);
            return !!employee;
        });
    }
    checkEmployeeById(employeeId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.checkEmployee(employeeId.toValue(), types_1.SearchKey.id);
        });
    }
    checkEmployeeByEmail(employeeEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.checkEmployee(employeeEmail, types_1.SearchKey.email);
        });
    }
    saveEmployee(employee) {
        return __awaiter(this, void 0, void 0, function* () {
            const alreadyExists = yield this.checkEmployeeById(employee.id);
            const requestMethod = alreadyExists ? types_1.RequestMethods.PUT : types_1.RequestMethods.POST;
            this.helper.saveNewRegisterToCache(employee, constants_1.CACHE_KEY, alreadyExists);
            return this.helper.saveNewRegisterToRemote(constants_1.BASE_URL, employee, requestMethod);
        });
    }
    saveEmployeeBulk(employees) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.helper.saveToRemoteBulk(constants_1.BASE_URL, employees);
            this.helper.saveMassiveToCache(employees, constants_1.CACHE_KEY);
        });
    }
    removeEmployeeById(employeeId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.helper.removeItemFromCache(constants_1.CACHE_KEY, employeeId);
            yield this.helper.removeItemFromRemote(constants_1.BASE_URL, employeeId);
        });
    }
    removeMassive(employeesIds) {
        return __awaiter(this, void 0, void 0, function* () {
            employeesIds.forEach(employeeId => {
                this.helper.removeItemFromCache(constants_1.CACHE_KEY, employeeId);
            });
            const requests = employeesIds.map((employeeId) => __awaiter(this, void 0, void 0, function* () {
                return this.helper.removeItemFromRemote(constants_1.BASE_URL, employeeId);
            }));
            yield Promise.all(requests);
        });
    }
}
exports.EmployeeRepository = EmployeeRepository;

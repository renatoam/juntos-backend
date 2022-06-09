"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
class Controller {
    execute(request, response) {
        this.request = request;
        this.response = response;
        this.handle();
    }
    static jsonResponse(response, code, message) {
        return response.status(code).json({ message });
    }
    ok(response, dto) {
        if (!!dto) {
            return response.status(200).json(dto);
        }
        else {
            return response.sendStatus(200);
        }
    }
    created(response) {
        return response.sendStatus(201);
    }
    clientError(message) {
        return Controller.jsonResponse(this.response, 400, message ? message : 'Bad request');
    }
    unauthorized(message) {
        return Controller.jsonResponse(this.response, 401, message ? message : 'Unauthorized');
    }
    paymentRequired(message) {
        return Controller.jsonResponse(this.response, 402, message ? message : 'Payment required');
    }
    forbidden(message) {
        return Controller.jsonResponse(this.response, 403, message ? message : 'Forbidden');
    }
    notFound(message) {
        return Controller.jsonResponse(this.response, 404, message ? message : 'Not found');
    }
    conflict(message) {
        return Controller.jsonResponse(this.response, 409, message ? message : 'Conflict');
    }
    tooMany(message) {
        return Controller.jsonResponse(this.response, 429, message ? message : 'Too many requests');
    }
    todo() {
        return Controller.jsonResponse(this.response, 400, 'TODO');
    }
    fail(error) {
        return this.response.status(500).json({
            message: error.toString()
        });
    }
}
exports.Controller = Controller;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createCustomer_1 = require("../createCustomer");
const router = (0, express_1.Router)();
router.post('/create', createCustomer_1.createCustomerController.execute);

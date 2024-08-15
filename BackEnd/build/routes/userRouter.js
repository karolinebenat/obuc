"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
router.post('/register', userController_1.registerUser);
router.post('/login', userController_1.loginUser);
router.get('/users', userController_1.getUserByName);
exports.default = router;
//# sourceMappingURL=userRouter.js.map
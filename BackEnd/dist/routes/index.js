"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const userRouter_1 = require("./v1/userRouter");
//import { TaskRouterV2 } from './taskRouter';
const router = (0, express_1.Router)();
exports.router = router;
router.use('/user', userRouter_1.UserRouterV2);

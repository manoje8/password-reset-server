import { Router } from "express";
import User from "../controller/user.controller.js";

const route = Router();

route.post("/register", User.register);
route.post("/login", User.login);
route.post("/forgot-password", User.forgotPassword)
route.post("/reset-password", User.resetPassword)

export default route
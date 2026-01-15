import { Router } from "express";
import AuthController from "../controllers/AuthController";
import AuthService from "../services/AuthService";
import AuthRepository from "../repositories/prisma/AuthRepository";
// import AuthRepository from "../repositories/inMemory/AuthRepository";
import { validateBody } from "../middlewares/validate";
import { LoginAuthSchema, RegisterAuthSchema } from "../schemas/AuthSchema";

const authRoutes = Router();

const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

authRoutes.post("/auth/register", validateBody(RegisterAuthSchema), authController.register);
authRoutes.post("/auth/login", validateBody(LoginAuthSchema), authController.login);
authRoutes.post("/auth/refresh", authController.refresh);
authRoutes.post("/auth/logout", authController.logout);

export default authRoutes;
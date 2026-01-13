import { Router } from "express";
import AuthController from "../controllers/AuthController";
import AuthService from "../services/AuthService";
import AuthRepository from "../repositories/inMemory/AuthRepository";
import { validateBody } from "../middlewares/validate";
import { RegisterAuthSchema } from "../schemas/AuthSchema";

// PORQUE ESSE ARQUIVO COMEÇA COM LETRA MINUSCULA (PESQUISAR)
const authRoutes = Router();

const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);


authRoutes.post("/auth/register", validateBody(RegisterAuthSchema), authController.register);
// authRoutes.post("/auth/login");
// authRoutes.post("/auth/logout");

export default authRoutes;
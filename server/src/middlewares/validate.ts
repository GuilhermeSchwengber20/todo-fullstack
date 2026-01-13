import { Request, Response, NextFunction } from "express"

// aprender sobre tratamento de erros
export const validateBody = (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validate(req.body, {abortEarly: false});
        next();
    } catch (error: any) {
        console.log(error);
        res.status(400).json({ errors: error.errors })
    }
}
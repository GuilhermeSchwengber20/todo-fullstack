import express from "express";
import authRoutes from "./routes/authRoutes";
import cookieParser from "cookie-parser";


const app = express();

app.use(cookieParser())
app.use(express.json());

app.use("/api/v1", authRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
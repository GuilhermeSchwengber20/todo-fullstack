import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";


const app = express();
app.use(cors())
app.use(cookieParser())
app.use(express.json());

app.use("/api/v1", authRoutes, taskRoutes);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
    console.log("Servidor rodando na porta:", PORT);
});
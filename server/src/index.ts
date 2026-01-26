import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";


const app = express();

const allowedOrigins = ["http://localhost:3000"]

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));


app.use(cookieParser())
app.use(express.json());

app.use("/api/v1", authRoutes, taskRoutes);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
    console.log("Servidor rodando na porta:", PORT);
});
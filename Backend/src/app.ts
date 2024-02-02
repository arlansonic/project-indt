import express from "express";
import userRoutes from "./api/users";
import authRoutes from "./api/auth";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(authRoutes);

app.use("/", (req, res) => {
    res.send("Server is running");
});

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
export default app;

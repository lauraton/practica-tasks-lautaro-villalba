import express from 'express';
import { startDB } from "./src/config/database.js";
import { User } from "./src/models/user.model.js";
import { Task } from "./src/models/task.model.js";
import { userRouter } from './src/routes/user.route.js';
import { taskRouter } from './src/routes/task.route.js';

const app = express()
const port = 3000;

app.use(express.json());
app.use("/api", userRouter)

app.listen(port, async () => {
    await startDB();
    console.log(`Servidor ejecutándose en ${port}`)
})
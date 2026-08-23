import express from 'express';
import { startDB } from "./src/config/database.js";

import { userRouter } from './src/routes/user.route.js';
import { taskRouter } from './src/routes/task.route.js';
import { profileRouter } from './src/routes/profile.route.js';
import { tagRouter } from './src/routes/tag.route.js';


const app = express()
const port = 3000;

app.use(express.json());
app.use("/api", userRouter)
app.use("/api", taskRouter)
app.use("/api", profileRouter);
app.use("/api", tagRouter);


app.listen(port, async () => {
    await startDB();
    console.log(`Servidor ejecutándose en ${port}`)
})
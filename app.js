import express from 'express';
import { startDB } from "./src/config/database.js";

const app = express()
const port = 3000;

app.use(express.json());

startDB();

app.listen(port, () => {
    
    console.log(`Servidor ejecutándose en ${port}`)
})
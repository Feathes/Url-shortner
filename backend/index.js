import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.js";
import authRouter from "./src/routes/auth.routes.js"
import router from "./src/routes/Urls.routes.js"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path"
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config()


const app = express();

connectDB();

const PORT = process.env.PORT;


app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use("/url", router)
app.use("/auth", authRouter)



const dist = path.join(__dirname, '../../frontend/dist')

  app.use(express.static(dist))
  app.get(/.*/, (req, res) => res.sendFile(path.join(dist, 'index.html')))

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
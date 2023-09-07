import express, { Express, Response, Request, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./models";
import allRoutes from "./routes";
import ErrorHandler from "./utils/ErrorHandler";
import morgan from 'morgan'
dotenv.config();


declare global {
  namespace Express {
    interface Request {
      user?: Record<string, any>;
    }
  }
}

const app: Express = express();
const PORT = process.env.PORT;
const MongoURI: any = process.env.MONGO_DB_URI;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "1mb" }));
app.use(cors());
app.use(morgan('tiny'));


app.get("/", async (req: Request, res: Response) => {
  res.send("howdy!");
});

app.use("/prod/api/v1/", allRoutes);

app.use(
  (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    const status = err.code || 500;
    const message = err.message || "Internal Server Error";
    console.log(status, message);
    return res.status(status).json({ message: message });
  }
);

(async () => {
  try {
    await connectDB(MongoURI);
    app.listen(PORT, async () => {
      console.log("server running on ", PORT);
    });
  } catch (err) {
    console.log("server failed to start", err);
  }
})();

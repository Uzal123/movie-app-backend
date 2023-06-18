import express, { Request, Response, NextFunction } from "express";
import path from "path";
import morgan from "morgan";
import { HttpError } from "./libs/httpError";
import routes from "./routes";
import cors from "cors";

const app = express();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/api", routes);

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  return res
    .status(err.code < 600 ? err.code : 500)
    .json({ ...err, message: err.message });
});

export default app;

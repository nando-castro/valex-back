import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import "express-async-errors";

import router from "./routes";
import errorHandler from "./middlewares/errorHandler";

dotenv.config();
const app = express();
app.use(json());
app.use(cors());
app.use(router);
app.use(errorHandler);

const PORT: number = Number(process.env.PORT);

app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});

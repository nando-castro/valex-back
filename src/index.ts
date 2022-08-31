import cors from "cors";
import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});

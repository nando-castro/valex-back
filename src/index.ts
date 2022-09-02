import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import router from "./routes";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

const PORT: number = Number(process.env.PORT);

console.log(typeof PORT)

app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});

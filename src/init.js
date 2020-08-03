import "@babel/polyfill";
import "./db";
import app from "./app";
import dotenv from "dotenv";
import "./models/video";
import "./models/comment";
import "./models/user";

dotenv.config();
const PORT = process.env.PORT || "0.0.0.0";

const handleListening = () =>
  console.log(`✅ Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);

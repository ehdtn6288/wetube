import "./db";
import app from "./app";
import dotenv from "dotenv";
dotenv.config();
import "./models/video";
import "./models/comment";

const PORT = 4000;

const handleListening = () =>
  console.log(`✅  Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);

import "./db";
import app from "./app";
import dotenv from "dotenv";
import "./models/video";
import "./models/comment";
import Comment from "./models/comment";
import User from "./models/user";
import Video from "./models/video";

dotenv.config();
const PORT = process.env.PORT | 4000;

const handleListening = () =>
  console.log(`✅  Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);

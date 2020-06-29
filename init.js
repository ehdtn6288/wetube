import app from "./app";

const PORT = 4000;
const handldListening = (req, res) => {
  console.log(`✅Listening on: http://localhost:${PORT}`);
};

app.listen(PORT, handldListening);

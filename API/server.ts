import Server from "./src/app";
import express, { Application } from "express"

const app : Application = express();
new Server(app);
const PORT: number = Number(process.env.PORT) || 8000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/v1/api/`);
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Server closed");
  });
});

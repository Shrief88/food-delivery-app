import dbConnection from "./config/dbConnection";
import env from "./config/validateEnv";
import app from "./app";

void dbConnection();

const server = app.listen(env.PORT, () => {
  console.log(`Express app is running on: http://${env.BASE_URL}:${env.PORT}`);
});

interface Error {
  name: string;
  message: string;
}

process.on("unhandledRejection", (err: Error) => {
  console.log(`unhandledRejection error : ${err.name} : ${err.message}`);
  server.close(() => {
    console.log("Shutting down server...");
    process.exit(1);
  });
});

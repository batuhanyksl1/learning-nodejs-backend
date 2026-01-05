import "reflect-metadata";
import { startServer } from "./server";
import { connectDatabase } from "./config/database";

const bootstrap = async () => {
  await connectDatabase();
  startServer();
};

bootstrap();

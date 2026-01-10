import "reflect-metadata";
import "./container"; // 👈 İlk olarak DI registrations yüklenmeli!
import { startServer } from "./server";
import { connectDatabase } from "./config/database";

const bootstrap = async () => {
  await connectDatabase();
  startServer();
};

bootstrap();

import { app } from "./app";
import { env } from "./config";

export const startServer = () => {
  app.listen(env.port, () => {
    console.log(`🚀 Server running on port ${env.port}`);
  });
};

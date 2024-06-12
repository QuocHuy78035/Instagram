import dotenv from "dotenv";
dotenv.config();
import * as express from "express";
import morgan from "morgan";
import helmet from "helmet";
import { DBConnection } from "./dbs/initDB";
import { NotFoundMiddleware } from "./middlewares/errors/notfound.middlewares";
import { GlobalErrorMiddleware } from "./middlewares/errors/globalerror.middleware";
import router from "./routers";
export default class Server {
  constructor(app: express.Application) {
    DBConnection.getInstance();
    this.config(app);
  }

  config(app: express.Application) {
    app.use(express.json());
    app.use(morgan("dev"));
    app.use(helmet());
    app.use(router);

    // handling error
    app.use(NotFoundMiddleware);
    app.use(GlobalErrorMiddleware);
  }
}

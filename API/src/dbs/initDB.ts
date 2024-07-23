import mongoose from "mongoose";
import { mongo } from "../configs/mongo.config";

export class DBConnection {
  static instance: DBConnection;
  constructor() {
    this.connect();
  }

  connect() {
    mongoose
      .connect(mongo.connectionString, { maxPoolSize: mongo.maxPoolSize })
      .then((res) => {
        console.log("Connect to MongoDB successfully!");
      })
      .catch((err) => {
        console.log("Error connect!");
      });
  }

  static getInstance() {
    if (!DBConnection.instance) {
      DBConnection.instance = new DBConnection();
    }
    return DBConnection.instance;
  }
}

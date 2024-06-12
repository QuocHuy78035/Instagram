import mongoose from "mongoose";

const connectionString: string = process.env.CONNECTION_STRING || "";

export class DBConnection {
  static instance: DBConnection;
  constructor() {
    this.connect();
  }

  connect() {
    mongoose
      .connect(connectionString, { maxPoolSize: 50 })
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



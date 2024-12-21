import {
  RedisClientType,
  RedisFunctions,
  RedisModules,
  RedisScripts,
} from "@redis/client";
import { createClient, RedisDefaultModules } from "redis";
export default class RedisClient {
  static instance: RedisClient;
  static client: RedisClientType<
    RedisDefaultModules & RedisModules,
    RedisFunctions,
    RedisScripts
  >;
  constructor() {
    this.connect();
  }
  async connect() {
    RedisClient.client = createClient({
      socket: {
        host: "redis-stack-server",
        port: 6379,
      },
    });
    try {
      let count = 0;
      RedisClient.client.on("error", (err) => {
        if (count < 5) {
          console.log("Redis Client Error");
          count++;
        }
      });
      RedisClient.client.on("ready", () => console.log("Redis ready"));
      await RedisClient.client.connect();
    } catch (err) {
      console.log(err);
    }
  }

  static getInstance() {
    if (!RedisClient.instance) {
      RedisClient.instance = new RedisClient();
    }
    return RedisClient.instance;
  }
}

// export default client;

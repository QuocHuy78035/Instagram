import RedisClient from "../../redis/redis";

export default class RedisJson {
    name: string;
    id: string;
    constructor(name: string, id: string) {
        this.name = name;
        this.id = id;
    }

    async getData() {
        return await RedisClient.client.json.get(`${this.name}:${this.id}`)
    }

    async setData(data: any) {
        await RedisClient.client.json.set(`${this.name}:${this.id}`, "$", data);
    }
}
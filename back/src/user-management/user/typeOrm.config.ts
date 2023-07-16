import { DataSource } from "typeorm";
import { ConfigService } from "@nestjs/config";
import {Users} from "./users.entity";


const configService = new ConfigService();

export default new DataSource({
    type: "postgres",
    host: configService.get<string>("postgresql"),
    port: configService.get<number>("5432"),
    username: configService.get<string>("user"),
    password: configService.get<string>("password"),
    database: configService.get<string>("database"),
    entities: [Users],
});


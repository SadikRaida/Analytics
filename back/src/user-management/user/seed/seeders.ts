import { DataSource } from "typeorm";
import { Users } from "../users.entity";
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
dotenv.config();


const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'postgresql',
    port: 5432,
    username: 'user',
    password: 'password',
    database: "database",
    synchronize: true,
    entities: [Users],
});

export async function seed() {
    await AppDataSource.initialize();

    const userRepository = AppDataSource.getRepository(Users);

    // create an admin user
    const adminUser = new Users();
    adminUser.email = 'admin@admin.com';
    adminUser.password = await bcrypt.hash('admin', 10);
    adminUser.role = 'ROLE_ADMIN';
    adminUser.society = 'admin';
    adminUser.url = 'https://admin.com';
    adminUser.apikey = 'admin';
    adminUser.isVerified = true;

    await userRepository.save(adminUser);
}

seed()

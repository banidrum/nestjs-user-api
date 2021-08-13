import { createConnection } from 'typeorm';
import { resolve } from 'path';
// import { DatabaseModule  } from '../database/database.module';

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () => await createConnection({
            type: "postgres",
            host: process.env.TYPEORM_HOST.toString(),
            port: Number(process.env.PORT),
            username: process.env.TYPEORM_USER.toString(),
            password: process.env.TYPEORM_PASSWORD.toString(),
            database: process.env.TYPEORM_DATABASE,
            entities: [
                `${resolve(__dirname, '..', '..', 'user', 'entity')}/**/*{.ts,.js}`
            ],
            // migrations: [`${resolve(__dirname, '..', 'migrations')}/*{.ts, .js}`],
            migrations: [process.env.TYPEORM_MIGRATIONS_DIR],
            cli: {
                // migrationsDir: `${resolve(__dirname, '..', 'migrations')}/*{.ts, .js}`
                migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR
            },
            synchronize: false,
            logging: false
        })
    }
]
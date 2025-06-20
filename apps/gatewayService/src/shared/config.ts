import "dotenv/config";
import * as path from "path";
import * as process from "node:process";
import * as fs from "node:fs";


// Получаем корневую директорию проекта
const PROJECT_ROOT = path.resolve(__dirname, '../..');


class RabbitMQ {
    url: string = "amqp://localhost"
    port = process.env.PORT ? parseInt(process.env.PORT) : 5672;
}


class AuthJWT {
    private publicKeyPath = path.join(PROJECT_ROOT, 'certs', 'jwt-public.pem');

    publicKey: string = this.readKeyFile(this.publicKeyPath);

    private readKeyFile(filePath: string): string {
        try {
            return fs.readFileSync(filePath, 'utf8');
        } catch (error) {
            console.error(`Error reading key file at ${filePath}:`, error);
            throw new Error(`Failed to load key file: ${filePath}`);
        }
    }
}


class Settings {
    api_v1_prefix: string = '/api/v1';
    port: number = 3001;
    rabbitmq: RabbitMQ = new RabbitMQ();
    authJWT = new AuthJWT();
}

export const settings = new Settings();

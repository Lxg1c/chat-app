import "dotenv/config";
import * as path from "path";
import * as fs from "node:fs";


// Получаем корневую директорию проекта
const PROJECT_ROOT = path.resolve(__dirname, '../..');


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
    api_v1_prefix: string = '/gateway';
    port: number = 5000;
    authJWT = new AuthJWT();
}

export const settings = new Settings();

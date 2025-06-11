import "dotenv/config";
import * as path from "path";
import * as fs from "fs";
import jwt from "jsonwebtoken";

// Получаем корневую директорию проекта
const PROJECT_ROOT = path.resolve(__dirname, '../..');

class DbSettings {
    url: string = "mongodb+srv://qwerty:qwerty123@cluster0.p8szdrh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    port = process.env.PORT ? parseInt(process.env.PORT) : 5000;
}

class AuthJWT {
    private privateKeyPath = path.join(PROJECT_ROOT, 'certs', 'jwt-private.pem');
    private publicKeyPath = path.join(PROJECT_ROOT, 'certs', 'jwt-public.pem');

    privateKey: string = this.readKeyFile(this.privateKeyPath);
    publicKey: string = this.readKeyFile(this.publicKeyPath);

    algorithm: jwt.Algorithm = "RS256";
    accessExpiresIn = "15m";
    refreshExpiresIn = "30d";

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
    db: DbSettings = new DbSettings();
    auth_jwt: AuthJWT = new AuthJWT();
}

export const settings = new Settings();

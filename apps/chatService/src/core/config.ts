import "dotenv/config";


class DbSettings {
    url: string = "mongodb+srv://qwerty:qwerty123@cluster0.p8szdrh.mongodb.net/chats?retryWrites=true&w=majority&appName=Cluster0";
}


class RabbitMQ {
    url: string = "amqp://localhost"
    port = process.env.PORT ? parseInt(process.env.PORT) : 5672;
}


class Settings {
    api_v1_prefix: string = '/api/v1';
    port: number = 5003
    db: DbSettings = new DbSettings();
}

export const settings = new Settings();

import "dotenv/config";


class DbSettings {
    url: string = "mongodb+srv://qwerty:qwerty123@cluster0.p8szdrh.mongodb.net/users_profile?retryWrites=true&w=majority&appName=Cluster0";
}


class RabbitMQ {
    url: string = "amqp://localhost"
    port = process.env.PORT ? parseInt(process.env.PORT) : 5672;
}


class Settings {
    api_v1_prefix: string = '/api/v1';
    db: DbSettings = new DbSettings();
    rabbitmq: RabbitMQ = new RabbitMQ();
    port: number = 5002
}

export const settings = new Settings();

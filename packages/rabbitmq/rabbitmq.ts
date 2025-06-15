import ampq, {Channel} from "amqplib"
import {settings} from "../../apps/authService/src/core/config";

let channel: Channel

export const connectRabbitMQ = async (): Promise<Channel> => {
    const connection = await ampq.connect(`${settings.rabbitmq.url}:${settings.rabbitmq.port}`);
    channel = await connection.createChannel();
    console.log("Подключены к каналу rabbitMQ");
    return channel;
}

export const getChannel = async (): Promise<Channel> => {
    if (!channel) {
        throw new Error("Канал rabbitMQ не инициализирован");
    }
    return channel
}

async function startConsumer(): Promise<void> {
    const channel = await connectRabbitMQ()
    const queue = "user_created"

    await channel.assertQueue(queue, {durable: true})

    await channel.consume(queue, async (msg) => {
        if (msg !== null) {
            const userData = JSON.parse(msg.content.toString())
            console.log('📥 Received user_created message:', userData);
        }
    })
}
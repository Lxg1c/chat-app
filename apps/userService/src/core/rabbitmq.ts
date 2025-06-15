import ampq from "amqplib"
import {userService} from "../service/userService";
import { Channel } from "amqplib";
import {settings} from "./config";

let channel: Channel

export const connectRabbitMQ = async (): Promise<Channel> => {
    const connection = await ampq.connect(`${settings.rabbitmq.url}:${settings.rabbitmq.port}`);
    channel = await connection.createChannel();
    console.log("Подключены к каналу rabbitMQ");
    return channel;
}

export const getChannel = async () => {
    if (!channel) {
        throw new Error("Канал rabbitMQ не инициализирован");
    }
    return channel
}

export async function startConsumer(): Promise<void> {
    const channel = await connectRabbitMQ()
    const queue = "create_user_profile"

    await channel.assertQueue(queue, {durable: true})

    await channel.consume(queue, async (msg) => {
        if (msg !== null) {
            try {
                const userData = JSON.parse(msg.content.toString());
                console.log('📥 Received user_created message:', userData);

                const { _id, username, phone } = userData;
                await userService.createUser({_id, username, phone });

                channel.ack(msg);
            } catch (err) {
                console.error("❌ Failed to process message:", err);
                channel.nack(msg, false, false)
            }
        }
    });
}
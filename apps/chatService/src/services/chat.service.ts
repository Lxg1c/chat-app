import { ChatModel } from "../models/chat.model";
import { MessageModel } from "../models/message.model";
import { Types } from "mongoose";

class ChatService {
    async sendMessageOrCreateChat(
        participants: Types.ObjectId[],
        senderId: string,
        content: string,
        attachments: string[] = [],
        isGroup = false,
        title?: string
    ) {
        // Найти или создать чат
        let chat = await this.createChat(participants, isGroup, title);

        // Отправить сообщение
        const message = new MessageModel({
            chatId: chat._id,
            senderId,
            content,
            attachments
        });

        await ChatModel.findByIdAndUpdate(chat._id, { updatedAt: new Date() });

        await message.save();

        return { chat, message };
    }


    async createChat(participants: Types.ObjectId[], isGroup: boolean, title?: string) {
        // Если это личный чат — участников должно быть ровно 2
        if (!isGroup && participants.length === 2) {
            // Найти чат, где участники совпадают (в любом порядке)
            const existingChat = await ChatModel.findOne({
                isGroup: false,
                participants: { $all: participants, $size: 2 }
            });

            if (existingChat) {
                return existingChat; // вернуть уже существующий
            }
        }

        // Если это новый (групповой или личный, которого не было)
        const chat = new ChatModel({
            participants,
            isGroup,
            title
        });
        return chat.save();
    }

    async sendMessage(chatId: string, senderId: string, content: string, attachments: string[]) {
        const message = new MessageModel({
            chatId,
            senderId,
            content,
            attachments
        })

        await ChatModel.findByIdAndUpdate(chatId, { updatedAt: new Date() });
        return message.save();
    }

    async getUserChats(userId: string) {
        return ChatModel.find({ participants: userId }).sort({ updatedAt: -1 });
    }
}

export const chatService = new ChatService();

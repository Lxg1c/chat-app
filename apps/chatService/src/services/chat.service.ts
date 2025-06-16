import { ChatModel } from "../models/chat.model";
import { MessageModel } from "../models/message.model";
import { Types } from "mongoose";

class ChatService {
    async createChat(participants: Types.ObjectId[], isGroup: boolean, title?: string) {
        const chat = new ChatModel({
            participants,
            isGroup,
            title
        });
        return chat.save();
    }

    async deleteChat(chatId: string) {
        await ChatModel.findByIdAndDelete(chatId);
        await MessageModel.deleteMany({ chatId });
    }

    async sendMessage(chatId: string, senderId: string, content: string, attachments: string[] = []) {
        const message = new MessageModel({
            chatId,
            senderId,
            content,
            attachments
        });
        await ChatModel.findByIdAndUpdate(chatId, { updatedAt: new Date() });
        return message.save();
    }

    async getUserChats(userId: string) {
        return ChatModel.find({ participants: userId }).sort({ updatedAt: -1 });
    }

    async getMessages(chatId: string, limit = 50, offset = 0) {
        return MessageModel.find({ chatId })
            .sort({ createdAt: -1 })
            .skip(offset)
            .limit(limit);
    }
}

export const chatService = new ChatService();

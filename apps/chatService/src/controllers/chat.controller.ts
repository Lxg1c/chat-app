import { Request, Response } from 'express';
import { chatService } from '../services/chat.service';

class ChatController {
    async createChat(req: Request, res: Response) {
        const { participants, isGroup, title } = req.body;
        const chat = await chatService.createChat(participants, isGroup, title);
        res.json(chat);
    }

    async deleteChat(req: Request, res: Response) {
        const { chatId } = req.params;
        await chatService.deleteChat(chatId);
        res.json({ message: 'Чат удален' });
    }

    async sendMessage(req: Request, res: Response) {
        const { chatId, senderId, content, attachments } = req.body;
        const message = await chatService.sendMessage(chatId, senderId, content, attachments);
        res.json(message);
    }

    async getUserChats(req: Request, res: Response) {
        const { userId } = req.query;
        const chats = await chatService.getUserChats(userId as string);
        res.json(chats);
    }

    async getMessages(req: Request, res: Response) {
        const { chatId } = req.query;
        const limit = parseInt(req.query.limit as string) || 50;
        const offset = parseInt(req.query.offset as string) || 0;
        const messages = await chatService.getMessages(chatId as string, limit, offset);
        res.json(messages);
    }
}

export const chatController = new ChatController();

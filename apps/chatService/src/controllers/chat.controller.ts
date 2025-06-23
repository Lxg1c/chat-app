import { Request, Response } from 'express';
import { chatService } from '../services/chat.service';

class ChatController {
    async createChat(req: Request, res: Response) {
        const { participants, isGroup, title } = req.body;
        const chat = await chatService.createChat(participants, isGroup, title);
        res.json(chat);
    }

    async getUserChats(req: Request, res: Response) {
        const { userId } = req.query;
        const chats = await chatService.getUserChats(userId as string);
        res.json(chats);
    }

    async sendMessage(req: Request, res: Response) {
        const { participants, senderId, content, attachments, isGroup, title } = req.body;

        const result = await chatService.sendMessageOrCreateChat(
            participants,
            senderId,
            content,
            attachments,
            isGroup,
            title
        );
        res.json(result);
    }
}

export const chatController = new ChatController();

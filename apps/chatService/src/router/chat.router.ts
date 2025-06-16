import { Router } from 'express';
import { chatController } from '../controllers/chat.controller';

const router = Router();

router.post('/chats', chatController.createChat);
router.delete('/chats/:chatId', chatController.deleteChat);
router.post('/messages', chatController.sendMessage);
router.get('/chats', chatController.getUserChats);
router.get('/messages', chatController.getMessages);

export default router;

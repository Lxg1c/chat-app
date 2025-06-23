import { Router } from 'express';
import { chatController } from '../controllers/chat.controller';

const router = Router();

router.get('/chats', chatController.getUserChats);
router.post('/chats', chatController.createChat);
router.post('/messages', chatController.sendMessage);

export default router;

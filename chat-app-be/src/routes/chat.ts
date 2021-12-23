import express from 'express';
// controllers
import chat from '../controllers/chat';

const router = express.Router();

router
  .get('/', chat.getRecentConversations)
  .post('/', chat.initiate)
  .get('/:chatId', chat.getConversationByChatId)
  .post('/:chatId', chat.postMessage)
  // TODO: mark as read
  .put('/:chatId/mark-read', chat.markConversationReadByChatId)

export default router;

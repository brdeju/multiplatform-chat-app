import ChatModel from '../models/chat';
import MessageModel from '../models/message';
import UserModel from '../models/user';
import WebSockets from '../utils/WebSockets';

export default {
  initiate: async (req: any, res: any) => {
    try {
      const { userIds } = req.body;
      const { userId: chatInitiator } = req;

      const errors = []
      if (!userIds) {
        errors.push("No user ids specified");
      }
      if (userIds == chatInitiator) {
        errors.push("Can't chat with yourself");
      }
      if (errors.length) {
        return res.status(400).json({ "error": errors.join(", ") });
      }

      const allUserIds = [...userIds, chatInitiator];
      const chat = await ChatModel.initiateChat(allUserIds, chatInitiator);
      return res.status(200).json({ success: true, chat });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },
  postMessage: async (req: any, res: any) => {
    try {
      const { chatId } = req.params;
      const { message: content } = req.body;

      const errors = []
      if (!chatId) {
        errors.push("No chat selected");
      }
      if (!content) {
        errors.push("No message");
      }
      if (errors.length) {
        return res.status(400).json({ "error": errors.join(", ") });
      }

      const currentLoggedUser = req.userId;
      const message = await MessageModel.createPostInChat(chatId, content, currentLoggedUser);

      WebSockets.io.emit('message', message);
      return res.status(200).json({ success: true, message });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },
  getRecentConversations: async (req: any, res: any) => {
    try {
      const { userId } = req;
      const chats = await ChatModel.getChatsByUser(userId)
      console.log('chats', userId, chats)

      if (!chats?.length) {
        return res.status(200).json({
          success: true,
          chats: [],
        });
      }

      const usersPromises: Array<Promise<any>> = [];
      const messagesPromises: Array<Promise<any>> = [];
      chats.forEach((chat: any) => {
        usersPromises.push(UserModel.getUsers(chat.userIds.split(',')))
        messagesPromises.push(MessageModel.getLastMessageByChatId(chat.chatid))
      });

      const chatsUsers = await Promise.all(usersPromises);
      const chatsMessages = await Promise.all(messagesPromises);
      console.log('chats users and messages', chatsUsers, messagesPromises)
      const conversations = chats.map((chat: any, id: number) => {
        return {
          ...chat,
          members: chatsUsers[id],
          lastMessage: chatsMessages[id],
        }
      })

      return res.status(200).json({
        success: true,
        conversations,
      });
    } catch (error) {
      console.log('chats error', error)
      return res.status(500).json({ success: false, error });
    }
  },
  getConversationByChatId: async (req: any, res: any) => {
    try {
      const { chatId } = req.params;
      const chat = await ChatModel.getChatById(chatId)

      if (!chat) {
        return res.status(400).json({
          success: false,
          message: 'No chat exists for this id',
        })
      }

      const users = await UserModel.getUsers(chat.userIds.split(','));

      const messages = await MessageModel.getMessagesByChatId(chat.chatid);

      return res.status(200).json({
        success: true,
        chat,
        messages,
        users,
      });
    } catch (error) {
      return res.status(500).json({ success: false, error });
    }
  },
  markConversationReadByChatId: async (req: any, res: any) => { },
}

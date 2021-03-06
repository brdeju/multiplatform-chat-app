import ChatModel from '../models/chat';
import MessageModel from '../models/message';
import UserModel from '../models/user';
import ExpoPushNotifications from '../utils/ExpoPushNotifications';
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
      const {
        params: { chatId },
        body: { message: content },
        file,
      } = req;

      const errors = []
      if (!chatId) {
        errors.push("No chat selected");
      }
      if (!file && !content) {
        errors.push("No message");
      }
      if (errors.length) {
        return res.status(400).json({ "error": errors.join(", ") });
      }

      const currentLoggedUser = req.userId;
      const message = await MessageModel.createPostInChat(chatId, content || '', currentLoggedUser, file);
      const chat = await ChatModel.getChatById(message.chatid);

      // TODO: some better way to do this ?
      const ws = WebSockets.io.of('/');
      for (let [id, socket] of ws.sockets) {
        const socketUserId = socket?.client?.user?.userid;
        if (chat.userIds.split(',').indexOf(socketUserId) === -1) {
          continue;
        }

        // console.log('push notif', socket?.client?.user?.pushToken);
        ws.to(id).emit('message', message);
        if (socket?.client?.user?.pushToken) {
          continue;
        }
        // TODO: prepare notification title and body
        // console.log('message', message)
        ExpoPushNotifications.handlePushNotification({ title: '', body: '' })
      }

      return res.status(200).json({ success: true, message });
    } catch (error) {
      console.log('postMessage error', error)
      return res.status(500).json({ success: false, error: error })
    }
  },
  getRecentConversations: async (req: any, res: any) => {
    try {
      const { userId } = req;
      const chats = await ChatModel.getChatsByUser(userId)

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

      const conversations = chats.map((chat: any, id: number) => {
        return {
          ...chat,
          members: chatsUsers[id],
          lastMessage: chatsMessages[id],
        }
      }).sort((chat1: any, chat2: any) => {
        return chat2?.lastMessage?.sentAt - chat1?.lastMessage?.sentAt
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

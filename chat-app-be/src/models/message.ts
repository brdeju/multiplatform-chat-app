import { v4 as uuid } from 'uuid';
import openDb from '../db';
import { getFileMeta } from '../middlewares/multer';
import { File } from '../types/types';

enum MESSAGE_TYPES {
  TEXT,
  IMAGE,
  VIDEO,
}
export interface IReadBy {
  readByUserId: string;
  readAt: Date;
}
export interface IMessage {
  messageid: string;
  chatid: string;
  postedBy: string;
  message: string;
  sentAt: Date;
  type: MESSAGE_TYPES;
  readBy: IReadBy[];
}

const INSERT_CHAT_MESSAGE = "INSERT INTO messages (messageid, chatid, postedBy, message, sentAt, type, readBy, attachment, attachmentMeta) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);"
const SELECT_CHAT_MESSAGE = `SELECT
m.messageid, m.chatid, m.message, m.sentAt, m.type, m.readBy,
m.attachment, m.attachmentMeta,
u.userid, u.username, u.lastlogon, u.lastlogoff, u.avatar
FROM messages m INNER JOIN users u ON m.postedBy = u.userid
WHERE m.rowid = ?;`
const SELECT_MESSAGES_BY_CHAT_ID = `SELECT
m.messageid, m.chatid, m.message, m.sentAt, m.type, m.readBy,
m.attachment, m.attachmentMeta,
u.userid, u.username, u.lastlogon, u.lastlogoff, u.avatar
FROM messages m INNER JOIN users u ON m.postedBy = u.userid
WHERE m.chatid = ?
ORDER BY m.sentAt DESC;`

export default {
  createPostInChat: async (chatId: string, message: string, postedBy: string, file: File) => {
    try {
      const db = await openDb()
      const chatMessage = await db.transaction(async (_db: any) => {
        const result = await db.run(INSERT_CHAT_MESSAGE, [
          uuid(), chatId, postedBy, message,
          Date.now(), MESSAGE_TYPES.TEXT, postedBy,
          file?.path || null, JSON.stringify(getFileMeta(file))
        ]);
        return await db.get(SELECT_CHAT_MESSAGE, [result?.lastID]);
      })

      // TODO: store and get info about chatMessage.readBy users
      // const readByUsers = await db.get('SELECT * FROM users WHERE userid IN (?)', chatMessage.readBy)
      // console.log('readByUsers', readByUsers);

      return chatMessage;
    } catch (error) {
      console.log('createPostInChat error', error);
      throw error;
    }
  },
  // TODO: add pagination
  getMessagesByChatId: async (chatId: string) => {
    try {
      const db = await openDb()
      return await db.all(SELECT_MESSAGES_BY_CHAT_ID, [chatId]);
    } catch (error) {
      console.log('getMessagesByChatId error', error);
      throw error;
    }
  },
  getLastMessageByChatId: async (chatId: string) => {
    try {
      const db = await openDb()
      return await db.get(SELECT_MESSAGES_BY_CHAT_ID, [chatId]);
    } catch (error) {
      console.log('getMessagesByChatId error', error);
      throw error;
    }
  }
}

import { v4 as uuid } from 'uuid';
import openDb from '../db';

export interface IChat {
  chatid: string;
  userIds: Array<string>;
  chatInitiator: string;
}

const SELECT_CHAT_BY_ID = `SELECT c.chatid, c.userIds,
u.userid, u.username, u.lastlogon, u.lastlogoff
FROM chats c INNER JOIN users u ON c.chatInitiator = u.userid
WHERE c.chatid = ?;`
const SELECT_CHAT_BY_MEMBERS = "SELECT * FROM chats WHERE userIds = ?;"
const INSERT_CHAT = "INSERT INTO chats (chatid, userIds, chatInitiator) VALUES (?, ?, ?);"
const SELECT_CHATS_BY_USER = "SELECT chatid, userIds FROM chats WHERE userIds LIKE ?;"

export default {
  initiateChat: async (userIds: Array<string>, chatInitiator: string) => {
    try {
      const db = await openDb()
      const availableRoom = await db.get(SELECT_CHAT_BY_MEMBERS, [userIds.sort().join(',')]);

      if (availableRoom) {
        return {
          isNew: false,
          message: 'retrieving an old chat room',
          chatId: availableRoom.chatid,
        }
      }

      const newRoom = await db.run(INSERT_CHAT, [uuid(), userIds.sort().join(','), chatInitiator]);

      return {
        isNew: true,
        message: 'creating a new chatroom',
        chatId: newRoom.lastID,
      }
    } catch (error) {
      console.log('initiateChat error', error);
      throw error;
    }
  },
  getChatById: async (chatId: string) => {
    try {
      const db = await openDb()
      return await db.get(SELECT_CHAT_BY_ID, [chatId]);
    } catch (error) {
      console.log('initiateChat error', error);
      throw error;
    }
  },
  getChatsByUser: async (userId: string) => {
    try {
      const db = await openDb()
      return await db.all(SELECT_CHATS_BY_USER, [`%${userId}%`]);
    } catch (error) {
      console.log('initiateChat error', error);
      throw error;
    }
  }
}

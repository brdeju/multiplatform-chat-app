import md5 from 'md5';
import openDb from '../db';

export interface IUser {
  userid: string;
  username: string;
  password: string;
  email: string;
  lastlogon: number;
  lastlogoff: number;
}

const INSERT_USER = "INSERT INTO users (username, email, password, lastlogon) VALUES (?, ?, ?, ?);"
const SELECT_USER_BY_ID = "SELECT userid, username, email, lastlogon, lastlogoff FROM users WHERE userid = ?;"
const SELECT_USERS_BY_IDS = "SELECT userid, username, lastlogon, lastlogoff FROM users"

export default {
  getUserById: async (id: string): Promise<IUser> => {
    try {
      const db = await openDb()
      return await db.get(SELECT_USER_BY_ID, [id]);
    } catch (error) {
      console.log('getUserById error', error);
      throw error
    }
  },
  createUser: async (username: string, email: string, password: string): Promise<string> => {
    try {
      const db = await openDb()
      const params = [username, email, md5(password), Date.now()]
      const result = await db.run(INSERT_USER, params)
      return result?.lastID
    } catch (error) {
      console.log('createUser error', error);
      throw error
    }
  },
  getUsers: async (userIds?: Array<string>) => {
    try {
      const db = await openDb()
      if (userIds) {
        return await db.all(`${SELECT_USERS_BY_IDS} WHERE userid IN (${userIds.join(',')});`);
      }
      return await db.all(`${SELECT_USERS_BY_IDS};`);
    } catch (error) {
      console.log('getUsersByIds error', error);
      throw error;
    }
  }
}

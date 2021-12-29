import md5 from 'md5';
import { v4 as uuid } from 'uuid';
import openDb from '../db';

export interface IUser {
  userid: string;
  username: string;
  password: string;
  email: string;
  lastlogon: number;
  lastlogoff: number;
}

const INSERT_USER = "INSERT INTO users (userid, username, email, password, lastlogon) VALUES (?, ?, ?, ?, ?);"
const NEW_USER_ID = "SELECT userid, username, email, lastlogon, lastlogoff FROM users WHERE rowid = ?;"
const LOG_IN = "SELECT userid, username, email, lastlogon, lastlogoff FROM users WHERE email = ? AND password = ?;"
const SELECT_USER_BY_ID = "SELECT userid, username, email, lastlogon, lastlogoff FROM users WHERE userid = ?;"
const SELECT_USERS_BY_IDS = "SELECT userid, username, lastlogon, lastlogoff FROM users"

export default {
  logIn: async (email: string, password: string): Promise<IUser> => {
    try {
      const db = await openDb()
      return await db.get(LOG_IN, [email, password]);
    } catch (error: any) {
      throw error.toString()
    }
  },
  getUserById: async (id: string): Promise<IUser> => {
    try {
      const db = await openDb()
      return await db.get(SELECT_USER_BY_ID, [id]);
    } catch (error: any) {
      throw error.toString()
    }
  },
  createUser: async (username: string, email: string, password: string): Promise<string> => {
    try {
      const db = await openDb()
      const params = [uuid(), username, email, md5(password), Date.now()]
      const newUser = await db.transaction(async (_db: any) => {
        const result = await db.run(INSERT_USER, params);
        return await db.get(NEW_USER_ID, [result?.lastID]);
      })
      return newUser;
    } catch (error: any) {
      throw error.toString()
    }
  },
  getUsers: async (userIds?: Array<string>) => {
    try {
      const db = await openDb()
      if (!userIds?.length) {
        return await db.all(`${SELECT_USERS_BY_IDS};`);
      }
      return await db.all(`${SELECT_USERS_BY_IDS} WHERE userid IN (${userIds.map((id: string) => `"${id}"`).join(',')});`);
    } catch (error: any) {
      console.log('getUsers', error)
      throw error.toString()
    }
  }
}

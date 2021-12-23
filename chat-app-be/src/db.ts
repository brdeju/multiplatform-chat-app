const Database = require('sqlite-async')

const DBSOURCE = './data/db.sqlite'
const CREATE_USER_TABLE = `CREATE TABLE if not exists users (
  userid INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  lastlogon INTEGER,
  lastlogoff INTEGER,
  CONSTRAINT email_unique UNIQUE (email)
)`
const CREATE_CHAT_TABLE = `CREATE TABLE if not exists chats (
  chatid INTEGER PRIMARY KEY AUTOINCREMENT,
  userIds TEXT NOT NULL,
  chatInitiator INTEGER NOT NULL,
  FOREIGN KEY(chatInitiator) REFERENCES users(userid)
)`
const CREATE_MESSAGE_TABLE = `CREATE TABLE if not exists messages (
  messageid INTEGER PRIMARY KEY AUTOINCREMENT,
  chatid INTEGER NOT NULL,
  postedBy INTEGER NOT NULL,
  message TEXT NOT NULL,
  sentAt INTEGER NOT NULL,
  type TEXT NOT NULL,
  readBy TEXT,
  FOREIGN KEY(chatid) REFERENCES chats(chatid)
  FOREIGN KEY(postedBy) REFERENCES users(userid)
)`

export default async () => {
  let db = null

  if (db) {
    return db
  }

  db = await Database.open(DBSOURCE)

  db.exec(CREATE_USER_TABLE)
  db.exec(CREATE_CHAT_TABLE)
  db.exec(CREATE_MESSAGE_TABLE)

  return db
}

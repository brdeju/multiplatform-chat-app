import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
// database
import openDb from './db';
// routes
import indexRouter from "./routes/index";
import userRouter from "./routes/user";
import chatRouter from "./routes/chat";
import deleteRouter from "./routes/delete";
// middlewaress
import { decode, socketAuth } from './middlewares/jwt'
// socket configuration
import WebSockets from "./utils/WebSockets";

const port = process.env.PORT || 3000;

const app = express();
app.set("port", port);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// init DB
openDb()

// Create HTTP server.
const server = http.createServer(app);
const io = new Server(server);

WebSockets.init(io);

// Routing
app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/chat", decode, chatRouter);
app.use("/delete", deleteRouter);
app.use((req, res) => {
  res.status(404);
});

io.on('connection', WebSockets.connection);

// // usernames which are currently connected to the chat
// const usernames: any = {};
// let numUsers: number = 0;
// io.on('connection', (socket: any) => { // should be socket: Socket
//   let addedUser = false;

//   // when the client emits 'new message', this listens and executes
//   socket.on('new message', (data: any) => {
//     const message = validator.escape(data);
//     // we tell the client to execute 'new message'
//     socket.broadcast.emit('new message', {
//       username: socket.username,
//       message,
//     });
//     // db.serialize(function() {
//     //   console.log('inserting message to database');
//     //   const insertMessageStr = "INSERT INTO messages (username, content, posted) VALUES ('" + socket.username + "','" + data.toString() + "'," + Date.now() + ");"
//     //   console.log(insertMessageStr)
//     //   db.run(insertMessageStr);
//     // });
//   });

//   // when the client emits 'add user', this listens and executes
//   socket.on('add user', (username: any) => {
//     // we store the username in the socket session for this client
//     socket.username = validator.escape(username);
//     if (validator.isAlphanumeric(socket.username) === false) {
//       console.log('username is invalid');
//       socket.emit('alertbadname');
//     } else {

//     }
//   });

//   socket.on('existing user', (username: any) => {
//     // we store the username in the socket session for this client
//     socket.username = validator.escape(username);
//     // db.serialize(function() {
//     //   console.log('checking if user exists');
//     //   const checkIfUserExists = "select count(*) from users where username = '" + socket.username +"'";
//     //   db.get(checkIfUserExists, (err: any, row: any) => {
//     //     if (err) {
//     //       console.error('error looking up if user exists', err);
//     //       return;
//     //     }
//     //     if (row['count(*)'] === 0) {
//     //       console.log("user doesn't exist!");
//     //       socket.emit('alertuserdoesntexists');
//     //     } else {
//     //       socket.emit('redirect');
//     //       // add the client's username to the global list
//     //       usernames[username] = username;
//     //       numUsers = 0;
//     //       for (const i in usernames) {
//     //         numUsers += 1;
//     //       }
//     //       addedUser = true;
//     //       socket.emit('login', {
//     //         numUsers: numUsers
//     //       });
//     //       // echo globally (all clients) that a person has connected
//     //       socket.broadcast.emit('user joined', {
//     //         username: socket.username,
//     //         numUsers: numUsers
//     //       });
//     //       console.log('loading previous chats for user');
//     //       const lastLogoffStr = `SELECT lastlogoff FROM users WHERE username = '${socket.username}';`;
//     //       console.log(lastLogoffStr);
//     //       let lastLogoff;
//     //       let queryChatsStr;
//     //       db.get(lastLogoffStr, (err: any, row: any) => {
//     //         if (err) {
//     //           console.error('error looking up last logoff', err);
//     //           return;
//     //         } else {
//     //           lastLogoff = row.lastlogoff;
//     //           if (lastLogoff === undefined) {
//     //             queryChatsStr = `SELECT username, content FROM messages WHERE posted < ${Date.now()} LIMIT 100`;
//     //           } else {
//     //             queryChatsStr = `SELECT username, content FROM messages WHERE posted > ${lastLogoff} LIMIT 100`;
//     //           }
//     //         }
//     //         console.log('lastLogoff', lastLogoff);
//     //         console.log(queryChatsStr);
//     //         db.all(queryChatsStr, (err: any, all: any) => {
//     //           if (err) {
//     //             console.error('error looking up previous chats', err);
//     //             return;
//     //           } else {
//     //             all.forEach((chat: any) => {
//     //               chat.content = validator.unescape(chat.content);
//     //             });
//     //             socket.emit('loadchat', all);
//     //           }
//     //         });
//     //       });
//     //     }
//     //   });
//     // });
//   });

//   // when the client emits 'typing', we broadcast it to others
//   socket.on('typing', () => {
//     socket.broadcast.emit('typing', {
//       username: socket.username
//     });
//   });

//   // when the client emits 'stop typing', we broadcast it to others
//   socket.on('stop typing', () => {
//     socket.broadcast.emit('stop typing', {
//       username: socket.username
//     });
//   });

//   // when the user disconnects.. perform this
//   socket.on('disconnect', () => {
//     // remove the username from global usernames list
//     if (addedUser) {
//       delete usernames[socket.username];
//       --numUsers;

//       // echo globally that this client has left
//       socket.broadcast.emit('user left', {
//         username: socket.username,
//         numUsers: numUsers
//       });
//     }
//     // db.serialize(function() {
//     //   console.log('updating user logoff time');
//     //   const updateLogoffStr = `UPDATE users SET lastlogoff = ${Date.now()} WHERE username = '${socket.username}';`;
//     //   console.log(updateLogoffStr)
//     //   db.run(updateLogoffStr);
//     // });
//   });
// });

/** Listen on provided port, on all network interfaces. */
server.listen(port);

/** Event listener for HTTP server "listening" event. */
server.on("listening", () => {
  console.log(`Listening on port:: http://localhost:${port}/`)
});

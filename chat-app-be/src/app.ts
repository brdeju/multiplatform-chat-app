import express from "express";
import http from "http";
import cors from "cors";
import { Socket, Server } from "socket.io";
// database
import openDb from './db';
// routes
import indexRouter from "./routes/index";
import userRouter from "./routes/user";
import chatRouter from "./routes/chat";
import deleteRouter from "./routes/delete";
// middlewaress
import { decode } from './middlewares/jwt'
// socket configuration
import WebSockets from "./utils/WebSockets";
import ExpoPushNotifications from "./utils/ExpoPushNotifications";

const port = process.env.PORT || 3000;

const app = express();
app.set("port", port);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static('public'));

// init DB
openDb()

// Create HTTP server.
const server = http.createServer(app);

// push notifications
ExpoPushNotifications.init();

// sockets
const io = new Server(server);
WebSockets.init(io);
io.on('connection', (socket: Socket) => console.log('client connected', socket.id));

// Routing
app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/chat", decode, chatRouter);
app.use("/delete", deleteRouter);
app.use((req, res) => {
  res.status(404);
});

/** Listen on provided port, on all network interfaces. */
server.listen(port);

/** Event listener for HTTP server "listening" event. */
server.on("listening", () => {
  console.log(`Listening on port:: http://localhost:${port}/`)
});

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
import { decode } from './middlewares/jwt'
// socket configuration
import WebSockets from "./utils/WebSockets";

const port = process.env.PORT || 3000;

const app = express();
app.set("port", port);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static('public'))

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

/** Listen on provided port, on all network interfaces. */
server.listen(port);

/** Event listener for HTTP server "listening" event. */
server.on("listening", () => {
  console.log(`Listening on port:: http://localhost:${port}/`)
});

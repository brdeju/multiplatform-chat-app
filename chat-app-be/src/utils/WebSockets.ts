import ExpoPushNotifications from "./ExpoPushNotifications";

const socketioAuth = require("socketio-auth");

const authenticate = (socket: any, data: any, cb: Function) => {
  cb(null, !!data);
};

const postAuthenticate = (socket: any, data: any) => {
  const user = {
    ...data,
  };
  delete user.token;

  // broadcast user status change to other users
  // client.emit('user:status', { userid: client.useris, lastlogin: client.lastlogin })

  socket.client.user = user;
  ExpoPushNotifications.saveToken(user?.pushToken);
};

export default class WebSockets {
  static io: any = null;
  static users: any = {};

  static init(io: any) {
    socketioAuth(io, { authenticate, postAuthenticate, timeout: "none" });
    this.io = io;
  }
}

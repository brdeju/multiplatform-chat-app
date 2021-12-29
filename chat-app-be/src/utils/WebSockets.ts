interface ISocketUser {
  socketId: string;
  userId: string;
}

class WebSockets {
  users: Array<ISocketUser> = [];
  io: any = null;

  init(_io: any) {
    this.io = _io;
  }

  connection(client: any) {
    console.log('client connected on websocket');

    // event fired when the chat room is disconnected
    client.on("disconnect", () => {
      this.users = this.users?.filter?.((user: any) => user.socketId !== client.id);
    });

    // add identity of user mapped to the socket id
    client.on("identity", (userId: string) => {
      console.log('identity', userId)
      this.users.push({
        socketId: client.id,
        userId: userId,
      });
    });

    // subscribe person to chat & other user as well
    client.on("subscribe", (room: any, otherUserId: string = "") => {
      this.subscribeOtherUser(room, otherUserId);
      client.join(room);
    });

    // mute a chat room
    client.on("unsubscribe", (room: any) => {
      client.leave(room);
    });
  }

  subscribeOtherUser(room: any, otherUserId: string) {
    const userSockets = this.users.filter((user) => user.userId === otherUserId);

    userSockets.map((userInfo) => {
      const socketConn = this.io.sockets.connected(userInfo.socketId);
      if (socketConn) {
        socketConn.join(room);
      }
    });
  }
}

export default new WebSockets();

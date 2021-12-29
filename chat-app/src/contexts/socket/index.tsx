import { createContext, useContext } from "react";
import Constants from 'expo-constants';
import io from "socket.io-client";

export const SocketContext = createContext<any>({
  socket: null,
  setSocket: () => {}
});

export default ({ children }: any) => {
  const socket = io(Constants.manifest?.extra?.API_URL, { transports: ['websocket'] });

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = () => {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error('useSocket must be inside an SocketContext with a value')
  }

  return ({ ...context });
}

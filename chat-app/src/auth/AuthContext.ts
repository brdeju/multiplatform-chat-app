import { createContext } from 'react';
import { AuthContextType } from "./types";

export default createContext<AuthContextType>({
  status: 'idle',
  userToken: null,
  user: null,
  setUser: () => { },
  signIn: () => { },
  signOut: () => { },
})

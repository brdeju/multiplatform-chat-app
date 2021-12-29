import { createContext } from 'react';
import { AuthContextType } from "./types";

export default createContext<AuthContextType>({} as AuthContextType)

import { useContext } from "react"
import AuthContext from "./AuthContext"
import { AuthContextType } from "./types"

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be inside an AuthProvider with a value')
  }

  const isLoggedIn = context.status === 'signIn';
  return ({ ...context, isLoggedIn });
}

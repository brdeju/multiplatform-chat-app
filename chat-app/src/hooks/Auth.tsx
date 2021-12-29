import { useContext } from "react"
import { AuthContext, AuthContextType } from "../contexts/auth"

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be inside an AuthProvider with a value')
  }

  const isLoggedIn = !!context.authData?.token;
  return ({ ...context, isLoggedIn });
}

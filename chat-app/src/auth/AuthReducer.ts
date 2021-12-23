import { AuthAction, AuthState } from "./types"

export default (prevState: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...prevState,
        status: 'signIn',
        token: action.token,
      }
    case 'SIGN_OUT':
      return {
        ...prevState,
        status: 'signOut',
        token: null,
      }
    case 'SET_USER':
      return {
        ...prevState,
        user: action.user,
      }
  }
}

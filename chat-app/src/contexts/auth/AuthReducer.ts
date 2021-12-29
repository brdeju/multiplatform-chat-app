import { AuthAction, AuthState } from "./types"

export default (prevState: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...prevState,
        loading: false,
        authData: action.authData,
      }
    case 'SIGN_OUT':
      return {
        ...prevState,
        loading: false,
        authData: undefined,
      }
    case 'RESTORE':
      return {
        ...prevState,
        loading: false,
        authData: action.authData,
      }
  }
}

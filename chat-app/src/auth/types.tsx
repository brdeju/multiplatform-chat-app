export interface AuthState {
  token: string | undefined | null,
  user: any, // TODO: use type
  status: 'idle' | 'signOut' | 'signIn',
  isLoggedIn?: boolean,
}
export type AuthAction = { type: 'SIGN_IN'; token: string } | { type: 'SIGN_OUT' } | { type: 'SET_USER', user: object }

export type AuthPayload = string

export interface AuthContextActions {
  signIn: (data: AuthPayload) => void
  signOut: () => void
  setUser: (user: object) => void
}

export interface AuthContextType extends AuthState, AuthContextActions { }

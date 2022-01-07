export type AuthData = {
  token: string;
  email: string;
  userid: string;
  username: string;
  lastlogon: number;
  imageUri?: string;
  pushToken?: string;
};

export interface AuthState {
  authData?: AuthData;
  loading: boolean;
  isLoggedIn?: boolean,
}
type RestoreAction = { type: 'RESTORE'; authData: AuthData }
type SignInAction = { type: 'SIGN_IN'; authData: AuthData }
type SignOutAction = { type: 'SIGN_OUT' }
export type AuthAction = SignInAction | SignOutAction | RestoreAction

export type AuthPayload = string

export interface AuthContextActions {
  signIn(authData: AuthData): Promise<void>;
  signOut(): void;
}

export interface AuthContextType extends AuthState, AuthContextActions { }

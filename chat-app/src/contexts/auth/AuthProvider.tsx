import React, { ReactNode, useEffect, useMemo, useReducer } from 'react'
import AuthContext from './AuthContext'
import AuthReducer from './AuthReducer'
import { AuthContextActions, AuthData } from './types'
import { getAuthData, setAuthData, removeAuthData } from './utils'
import { useSocket } from '../socket'
import { usePushNotifications } from '../pushNotifications'

export default ({ children }: { children: ReactNode }) => {
  const { pushToken } = usePushNotifications();
  const { socket } = useSocket();
  const [state, dispatch] = useReducer(AuthReducer, {
    authData: undefined,
    loading: true,
    isLoggedIn: false,
  });

  useEffect(() => {
    const initState = async () => {
      try {
        const authData = await getAuthData()
        if (authData !== null) {
          socket?.emit?.('authentication', authData)
          dispatch({ type: 'RESTORE', authData: { ...authData, pushToken } })
        } else {
          socket?.emit?.('logout')
          dispatch({ type: 'SIGN_OUT' })
        }
      } catch (e) {
        // catch error here
        // Maybe sign_out user!
      }
    }

    initState()
  }, [])

  const authActions: AuthContextActions = useMemo(
    () => ({
      signIn: async (authData: AuthData) => {
        socket?.emit?.('authentication', authData)
        dispatch({ type: 'SIGN_IN', authData: { ...authData, pushToken } })
        await setAuthData(authData)
      },
      signOut: async () => {
        socket?.emit?.('logout')
        await removeAuthData()
        dispatch({ type: 'SIGN_OUT' })
      },
    }),
    [pushToken]
  );

  return (
    <AuthContext.Provider value={{ ...state, ...authActions }}>
      {children}
    </AuthContext.Provider>
  )
}

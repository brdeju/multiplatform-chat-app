import React, { ReactNode, useEffect, useMemo, useReducer } from 'react'
import AuthContext from './AuthContext'
import AuthReducer from './AuthReducer'
import { AuthContextActions, AuthData } from './types'
import { getAuthData, setAuthData, removeAuthData } from './utils'

export default ({ children }: { children: ReactNode }) => {
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
          dispatch({ type: 'RESTORE', authData })
        } else {
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
        dispatch({ type: 'SIGN_IN', authData })
        await setAuthData(authData)
      },
      signOut: async () => {
        await removeAuthData()
        dispatch({ type: 'SIGN_OUT' })
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={{ ...state, ...authActions }}>
      {children}
    </AuthContext.Provider>
  )
}

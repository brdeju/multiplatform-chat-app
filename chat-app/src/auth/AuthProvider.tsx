import React, { ReactNode, useEffect, useMemo, useReducer } from 'react'
import AuthContext from './AuthContext'
import AuthReducer from './AuthReducer'
import { AuthContextActions } from './types'
import { getToken, setToken, removeToken } from './utils'

export default ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(AuthReducer, {
    status: 'idle',
    token: null,
    user: null,
  })

  useEffect(() => {
    const initState = async () => {
      try {
        const token = await getToken()
        if (token !== null) {
          dispatch({ type: 'SIGN_IN', token })
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
      setUser: async (user: object) => {
        dispatch({ type: 'SET_USER', user })
      },
      signIn: async (token: string) => {
        dispatch({ type: 'SIGN_IN', token })
        await setToken(token)
      },
      signOut: async () => {
        await removeToken() // TODO: use Vars
        dispatch({ type: 'SIGN_OUT' })
      },
    }),
    []
  )

  return (
    <AuthContext.Provider value={{ ...state, ...authActions }}>
      {children}
    </AuthContext.Provider>
  )
}

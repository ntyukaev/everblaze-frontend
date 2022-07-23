import { createContext, useContext, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as auth from '../api/auth'
import { LoginInput, RegisterInput, UserProps } from '../types'

type AuthContextType = {
  user?: UserProps
  error?: any,
  login?: Function,
  register?: Function
}

const AuthContext = createContext<AuthContextType>({})

/* eslint-disable camelcase */
export const AuthProvider = ({ children }: {children: any}) => {
  const navigate = useNavigate()
  const [user, setUser] = useState()
  const [error, setError] = useState()

  const register = ({ name, email, password, password_confirmation }: RegisterInput) => {
    auth.register({ name, email, password, password_confirmation })
      .then((response) => {
        setUser(response.data)
        auth.saveUser(response.data)
        navigate('/')
      })
      .catch((error) => setError(error.response.data))
  }

  const login = ({ email, password }: LoginInput) => {
    auth.login({ email, password })
      .then((response) => {
        setUser(response.data)
        auth.saveUser(response.data)
        navigate('/')
      })
      .catch((error) => setError(error.response.data))
  }

  const value = useMemo(() => ({
    user,
    error,
    login,
    register
  }), [user, error])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.any
}

const useAuth = () => {
  return useContext(AuthContext)
}

export default useAuth

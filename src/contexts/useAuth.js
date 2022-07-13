import { createContext, useContext, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as auth from '../api/auth'

const AuthContext = createContext({})

/* eslint-disable camelcase */
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState()
  const [error, setError] = useState()

  const register = ({ name, email, password, password_confirmation }) => {
    auth.register({ name, email, password, password_confirmation })
      .then((response) => {
        setUser(response.data)
        auth.saveUser(response.data)
        navigate('/')
      })
      .catch((error) => setError(error.response.data))
  }

  const login = ({ email, password }) => {
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

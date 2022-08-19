import { LoginInput, RegisterInput, UserInfoImpl } from '../ts/interfaces'
import axios from './axios'

/* eslint-disable camelcase */
export const register = ({ name, email, password, password_confirmation }: RegisterInput) => {
  return axios.post('/register', {
    name,
    email,
    password,
    password_confirmation
  })
}

export const login = ({ email, password }: LoginInput) => {
  return axios.post('/login', {
    email,
    password
  })
}

export const saveUser = (user: UserInfoImpl) => {
  localStorage.setItem('user', JSON.stringify(user))
}

export const getUser = () => {
  const user = localStorage.getItem('user')
  if (typeof user !== 'string') {
    return null
  }
  try {
    return JSON.parse(user)
  } catch (e) {
    return null
  }
}

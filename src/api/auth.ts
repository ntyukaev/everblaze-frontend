import axios from './axios'

export type LoginInput = {
  email: string,
  password: string
}

export type RegisterInput = LoginInput & {name: string, password: string, password_confirmation: string}

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

export type UserInfo = {
  id: number,
  name: string,
  email: string,
  created_at: string,
  email_verified_at: string,
  updated_at: string
}

export type UserType = {
  access_token: string,
  token_type: string,
  user: UserInfo
}

export const saveUser = (user: UserType) => {
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

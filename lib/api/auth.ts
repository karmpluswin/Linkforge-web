import client from './client'

export const register = async (name: string, email: string, password: string) => {
  const res = await client.post('/api/v1/auth/register', { name, email, password })
  return res.data
}

export const login = async (email: string, password: string) => {
  const res = await client.post('/api/v1/auth/login', { email, password })
  return res.data
}
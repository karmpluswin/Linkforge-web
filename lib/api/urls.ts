import client from './client'

export const createUrl = async (originalUrl: string, customAlias?: string) => {
  const res = await client.post('/api/v1/urls', { originalUrl, customAlias })
  return res.data
}

export const getMyUrls = async () => {
  const res = await client.get('/api/v1/urls')
  return res.data
}

export const deleteUrl = async (id: string) => {
  const res = await client.delete(`/api/v1/urls/${id}`)
  return res.data
}

export const updateUrl = async (id: string, data: { isActive?: boolean; customAlias?: string }) => {
  const res = await client.patch(`/api/v1/urls/${id}`, data)
  return res.data
}
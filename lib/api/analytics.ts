import client from './client'

export const getAnalyticsSummary = async (shortCode: string) => {
  const res = await client.get(`/api/v1/analytics/${shortCode}`)
  return res.data
}

export const getClickLog = async (shortCode: string, page = 1, limit = 20) => {
  const res = await client.get(`/api/v1/analytics/${shortCode}/clicks?page=${page}&limit=${limit}`)
  return res.data
}
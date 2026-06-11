export interface User {
  id: string
  name: string
  email: string
  plan: 'free' | 'pro'
}

export interface Url {
  _id: string
  originalUrl: string
  shortCode: string
  customAlias: string | null
  clickCount: number
  isActive: boolean
  expiresAt: string | null
  createdAt: string
}

export interface AnalyticsSummary {
  url: {
    shortCode: string
    originalUrl: string
    shortUrl: string
    isActive: boolean
    createdAt: string
  }
  totalClicks: number
  dailyClicks: { _id: string; clicks: number }[]
}
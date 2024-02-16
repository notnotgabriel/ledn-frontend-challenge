import { type Rate } from '../domain/rate'

export async function fetchRate(): Promise<Rate> {
  try {
    const response = await fetch('/api/exchange-rate')
    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}

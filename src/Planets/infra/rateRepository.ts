import { type Rate } from '../domain/rate'

export async function fetchRate(): Promise<Rate> {
  try {
    const response = fetch('/api/exchange-rate').then((res) => res.json())
    return response
  } catch (error) {
    throw error
  }
}

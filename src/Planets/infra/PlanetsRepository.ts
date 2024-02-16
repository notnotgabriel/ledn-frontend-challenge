import { type RawPlanets } from '../domain/planets'

export async function fetchPlanets(): Promise<RawPlanets> {
  try {
    const response = await fetch('/api/planets')

    if (!response.ok) {
      throw new Error('Failed to get planets')
    }

    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}

export async function fetchPlanetByID(planetID?: string) {
  try {
    if (planetID) {
      const response = await fetch(`/api/planets/${planetID}`)
      const data = await response.json()
      return data
    }
    return null
  } catch (error) {
    throw error
  }
}

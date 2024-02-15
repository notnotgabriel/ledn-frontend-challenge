import { type RawPlanets } from '../domain/planets'

export async function fetchPlanets(): Promise<RawPlanets> {
  try {
    const response = fetch('/api/planets').then((res) => res.json())
    return response
  } catch (error) {
    throw error
  }
}

export async function fetchPlanetByID(planetID?: string) {
  try {
    if (planetID) {
      const response = fetch(`/api/planets/${planetID}`).then((res) =>
        res.json()
      )
      return response
    }
    return null
  } catch (error) {
    throw error
  }
}

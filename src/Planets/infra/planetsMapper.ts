import type { RawPlanets, Planet } from '../domain/planets'

export function mapApiToPlanets(data: RawPlanets) {
  return data.planets.filter((planet) => planet.residents.length > 0)
}

export function mapApiToPlanet(data: { planet: Planet }) {
  return data.planet || {}
}

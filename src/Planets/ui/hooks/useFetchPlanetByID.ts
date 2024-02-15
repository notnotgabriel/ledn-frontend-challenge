import { useQuery } from '@tanstack/react-query'

import { fetchPlanetByID } from '../../infra/PlanetsRepository'
import { mapApiToPlanet } from '../../infra/planetsMapper'

export function useFetchPlanetByID(planetID?: string) {
  return useQuery({
    enabled: !!planetID,
    queryKey: ['planet', planetID],
    queryFn: () => fetchPlanetByID(planetID),
    select: mapApiToPlanet
  })
}

import { useQuery, useQueries, useQueryClient } from '@tanstack/react-query'
import { fetchPlanets } from '../../infra/PlanetsRepository'
import { mapApiToPlanets } from '../../infra/planetsMapper'
import { fetchTransactionsByUsers } from '../../infra/TransactionsRepository'

import { type Planet } from '../../domain/planets'

function sortPlanets(planetA: Planet, planetB: Planet) {
  return (
    (planetB.transactions || []).length - (planetA.transactions || []).length
  )
}

export function useFetchPlanets() {
  const queryClient = useQueryClient()

  const { data, isFetched, ...rest } = useQuery({
    queryKey: ['planets'],
    queryFn: () => fetchPlanets(),
    select: mapApiToPlanets
  })

  const planetsID = data?.map((planet) => planet.id) || []

  const results = useQueries({
    queries: planetsID.map((id) => ({
      queryKey: ['planet_transactions', id],
      queryFn: () => {
        const usersID =
          data?.find((planet) => planet.id === id)?.residents || []

        return fetchTransactionsByUsers(usersID)
      }
    }))
  })

  const planets = data
    ?.map((planet, index) => {
      const transactions = results[index].data?.transactions || []
      return {
        ...planet,
        transactions
      }
    })
    .sort(sortPlanets)

  queryClient.setQueryData(['planets'], () => ({
    planets
  }))

  return {
    data: data || [],
    isFetched,
    ...rest
  }
}

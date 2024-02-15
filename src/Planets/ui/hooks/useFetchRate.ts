import { useQuery } from '@tanstack/react-query'

import { fetchRate } from '../../infra/rateRepository'

export function useFetchRate() {
  return useQuery({
    queryKey: ['rate'],
    queryFn: () => fetchRate(),
    select: (data) => {
      const { rate } = data
      return Number(rate)
    },
    refetchInterval: 3000
  })
}

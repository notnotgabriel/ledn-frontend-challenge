import { useQuery } from '@tanstack/react-query'

import { fetchTransactionsByUsers } from '../../infra/TransactionsRepository'
import { mapApiToTransactions } from '../../infra/transactionsMapper'

export function useFetchTransactions({
  planetID,
  usersID
}: {
  planetID?: string
  usersID?: string[]
}) {
  return useQuery({
    enabled: !!planetID && !!usersID,
    queryKey: ['planet_transactions', planetID],
    queryFn: () => fetchTransactionsByUsers(usersID),
    select: mapApiToTransactions
  })
}

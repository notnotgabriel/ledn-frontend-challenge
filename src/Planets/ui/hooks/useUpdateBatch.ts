import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { updateBatch } from '../../infra/TransactionsRepository'
import { type Transaction } from '../../domain/transactions'
import { filterInProgressTransactions } from '../../infra/transactionsMapper'

export function useUpdateBatch() {
  return useMutation({
    mutationFn: (transactions?: Transaction[]) => {
      const inProgress = filterInProgressTransactions(transactions)
      return updateBatch(inProgress)
    },
    onSuccess: (data) => {
      toast.success(data.message, {
        autoClose: false,
        hideProgressBar: true,
        position: 'top-right'
      })
    },
    onError: (data) => {
      toast.error(data.message || 'Error while updating the transactions')
    }
  })
}

import { type Transaction, type RawTransactions } from '../domain/transactions'

export function mapApiToTransactions(data: RawTransactions) {
  return data?.transactions || []
}

export function filterInProgressTransactions(transactions?: Transaction[]) {
  return (transactions || []).filter(
    (transaction) => transaction.status === 'inProgress'
  )
}

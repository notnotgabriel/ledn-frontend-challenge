import { type RawTransactions } from '../domain/transactions'

export function mapApiToTransactions(data: RawTransactions) {
  return data?.transactions || []
}

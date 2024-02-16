import { type Transaction, type RawTransactions } from '../domain/transactions'

export async function fetchTransactionsByUsers(
  usersId?: string[]
): Promise<RawTransactions> {
  try {
    const response = await fetch(`/api/transactions/users/[${usersId}]`)
    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}

export async function updateBatch(
  transactions?: Transaction[]
): Promise<{ message: string; transactions: Transaction[] }> {
  try {
    const response = await fetch('/api/transactions/update-batch', {
      method: 'PUT',
      body: JSON.stringify({
        transactions: transactions
      })
    })
    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}

import { type Transaction, type RawTransactions } from '../domain/transactions'

export async function fetchTransactionsByUsers(
  usersId?: string[]
): Promise<RawTransactions> {
  try {
    const response = fetch(`/api/transactions/users/[${usersId}]`).then((res) =>
      res.json()
    )
    return response
  } catch (error) {
    throw error
  }
}

export async function updateBatch(
  transactions?: Transaction[]
): Promise<{ message: string; transactions: Transaction[] }> {
  try {
    const response = fetch('/api/transactions/update-batch', {
      method: 'PUT',
      body: JSON.stringify({
        transactions: transactions
      })
    }).then((res) => res.json())
    return response
  } catch (error) {
    throw error
  }
}

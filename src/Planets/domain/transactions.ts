export type Currency = 'ICS' | 'GCS'

export type TransactionStatus = 'inProgress' | 'completed' | 'blocked'

export type Transaction = {
  id: string
  user: number
  amount: number
  currency: Currency
  date: string
  status: TransactionStatus
}

export type RawTransactions = {
  transactions: Transaction[]
}

export function calculateTotalGCS(transactions?: Transaction[], rate?: number) {
  if (!transactions?.length || !rate) {
    return 0
  }
  return transactions.reduce((total, transaction) => {
    if (transaction.currency === 'GCS') {
      return total + transaction.amount
    } else {
      return total + transaction.amount * rate
    }
  }, 0)
}

export function calculateTotalICS(transactions?: Transaction[], rate?: number) {
  if (!transactions?.length || !rate) {
    return 0
  }

  return transactions.reduce((total, transaction) => {
    if (transaction.currency === 'ICS') {
      return total + transaction.amount
    } else {
      return total + transaction.amount / rate
    }
  }, 0)
}

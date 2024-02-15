import { useReducer } from 'react'

import type { DateValue } from '@mantine/dates'
import type {
  TransactionStatus,
  Currency,
  Transaction
} from '../../domain/transactions'

type FilterProps = {
  date: DateValue | null
  status?: TransactionStatus
  currencies?: Currency[]
}

type FilterStateProps = {
  filters: FilterProps
  data: Transaction[]
  filteredData?: Transaction[]
}

const filterInitialState = {
  filters: {
    date: null,
    currencies: []
  },
  data: [],
  filteredData: []
}

function filterTransactions({ filters, data }: FilterStateProps) {
  const filtered = data
    .filter((transaction) => {
      if (filters.date) {
        return new Date(transaction.date) >= filters.date
      }
      return true
    })
    .filter((transaction) => {
      if (filters.status) {
        return transaction.status === filters.status
      }
      return true
    })
    .filter((transaction) => {
      if (filters.currencies?.length) {
        return filters.currencies?.includes(transaction.currency)
      }
      return true
    })

  return filtered
}

type Action =
  | { type: 'UPDATE_DATA'; data: Transaction[] }
  | { type: 'FILTER_BY_DATE'; date: DateValue | null }
  | { type: 'FILTER_BY_STATUS'; status?: TransactionStatus }
  | { type: 'FILTER_BY_CURRENCIES'; currencies?: Currency[] }

function reducer(state: FilterStateProps, action: Action): FilterStateProps {
  switch (action.type) {
    case 'UPDATE_DATA':
      return {
        ...state,
        data: action.data
      }
    case 'FILTER_BY_DATE': {
      const filters = {
        ...state.filters,
        date: action.date
      }
      return {
        ...state,
        filters,
        filteredData: filterTransactions({ filters, data: state.data })
      }
    }
    case 'FILTER_BY_STATUS': {
      const filters = {
        ...state.filters,
        status: action.status
      }
      return {
        ...state,
        filters,
        filteredData: filterTransactions({ filters, data: state.data })
      }
    }
    case 'FILTER_BY_CURRENCIES': {
      const filters = {
        ...state.filters,
        currencies: action.currencies
      }
      return {
        ...state,
        filters,
        filteredData: filterTransactions({ filters, data: state.data })
      }
    }
    default:
      return {
        ...state
      }
  }
}

export function useFiltersReducer() {
  const [{ filteredData }, dispatch] = useReducer(reducer, {
    ...filterInitialState,
    data: []
  })

  return {
    filteredData,
    dispatch
  }
}

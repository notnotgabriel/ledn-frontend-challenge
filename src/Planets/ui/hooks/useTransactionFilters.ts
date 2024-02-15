import { useEffect } from 'react'
import { type DateValue } from '@mantine/dates'

import { useFetchTransactions } from './useFetchTransactions'
import type { Currency, TransactionStatus } from '../../domain/transactions'
import { useFiltersReducer } from './useFiltersReducer'

export function useTransactionFilters({
  planetID,
  usersID
}: {
  planetID?: string
  usersID?: string[]
}) {
  const { data, isFetched, ...rest } = useFetchTransactions({
    planetID,
    usersID
  })

  const { filteredData, dispatch } = useFiltersReducer()

  const transactions = filteredData?.length ? filteredData : data

  useEffect(() => {
    if (isFetched && data?.length) {
      dispatch({
        type: 'UPDATE_DATA',
        data: data
      })
    }
  }, [isFetched, data?.length])

  function filterByDate(date: DateValue | null) {
    dispatch({
      type: 'FILTER_BY_DATE',
      date
    })
  }

  function filterByStatus(status?: TransactionStatus) {
    dispatch({
      type: 'FILTER_BY_STATUS',
      status
    })
  }

  function filterByCurrency(currencies?: Currency[]) {
    dispatch({
      type: 'FILTER_BY_CURRENCIES',
      currencies
    })
  }

  return {
    transactions,
    filterByDate,
    filterByStatus,
    filterByCurrency,
    ...rest
  }
}

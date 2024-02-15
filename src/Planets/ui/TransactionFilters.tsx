import { useState } from 'react'
import { Checkbox, Group } from '@mantine/core'
import { DateInput, type DateValue } from '@mantine/dates'
import type { Currency, TransactionStatus } from '../domain/transactions'

type TransactionFiltersProps = {
  filterByDate?: (date: DateValue | null) => void
  filterByStatus?: (status?: TransactionStatus) => void
  filterByCurrency?: (currencies?: Currency[]) => void
}

export function TransactionFilters({
  filterByDate,
  filterByStatus,
  filterByCurrency
}: TransactionFiltersProps) {
  const [date, setDate] = useState<Date | null>()
  const [currenciesFilter, seCurrenciesFilter] = useState<Currency[]>([])

  function handleDateChange(dateFilterValue: DateValue) {
    setDate(dateFilterValue)
    filterByDate?.(dateFilterValue)
  }

  function handleFilterStatusChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const value = event.target.value as TransactionStatus
    const isChecked = event.target.checked

    if (isChecked) {
      filterByStatus?.(value)
    } else {
      filterByStatus?.()
    }
  }

  function handleCurrencyChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value as Currency
    const isChecked = event.target.checked
    const currencies = [...currenciesFilter]

    if (isChecked) {
      currencies.push(value)
    } else {
      currencies.splice(currenciesFilter.indexOf(value), 1)
    }

    seCurrenciesFilter(currencies)
    filterByCurrency?.(currencies)
  }

  return (
    <Group style={{ alignItems: 'self-start' }}>
      <DateInput
        value={date}
        onChange={handleDateChange}
        label='Transaction date'
        placeholder='Specify a transaction date'
        w={250}
        clearable
      />
      <Checkbox.Group label='Status'>
        <Group mt='xs'>
          <Checkbox
            label='In progress'
            value='inProgress'
            onChange={handleFilterStatusChange}
          />
        </Group>
      </Checkbox.Group>
      <Checkbox.Group label='Currency'>
        <Group mt='xs'>
          <Checkbox label='ICS' value='ICS' onChange={handleCurrencyChange} />
          <Checkbox label='GCS' value='GCS' onChange={handleCurrencyChange} />
        </Group>
      </Checkbox.Group>
    </Group>
  )
}

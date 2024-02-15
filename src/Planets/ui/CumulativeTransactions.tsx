import { Group, Stack, Text, NumberFormatter } from '@mantine/core'

import { calculateTotalGCS, calculateTotalICS } from '../domain/transactions'
import { useFetchRate } from './hooks/useFetchRate'
import { useFetchTransactions } from './hooks/useFetchTransactions'

export function CumulativeTransactions({
  planetID,
  usersID
}: {
  planetID?: string
  usersID?: string[]
}) {
  const { data, isLoading } = useFetchTransactions({
    planetID,
    usersID
  })
  const { data: rate } = useFetchRate()

  const totalICS = calculateTotalICS(data, rate)
  const totalGCS = calculateTotalGCS(data, rate)

  if (isLoading) {
    // TODO: add skeleton
    return <p>loading...</p>
  }

  return (
    <Group>
      <Stack gap={1}>
        <Text fw='bold'>Total ICS</Text>
        <NumberFormatter
          prefix='$ '
          value={totalICS}
          thousandSeparator
          decimalScale={2}
        />
      </Stack>
      <Stack gap={1}>
        <Text fw='bold'>Total GCS</Text>
        <NumberFormatter
          prefix='$ '
          value={totalGCS}
          thousandSeparator
          decimalScale={2}
        />
      </Stack>
      <Stack gap={1}>
        <Text fw='bold'>Rate</Text>
        <NumberFormatter value={rate} decimalScale={2} />
      </Stack>
    </Group>
  )
}

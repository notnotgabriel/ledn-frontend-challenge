import { useParams } from 'react-router-dom'
import { Title, Paper, Text, Stack, Table, Group, Button } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { useFetchPlanetByID } from './hooks/useFetchPlanetByID'
import { TransactionFilters } from './TransactionFilters'
import { useTransactionFilters } from './hooks/useTransactionFilters'
import { CumulativeTransactions } from './CumulativeTransactions'
import { BlockTransactionsModal } from './BlockTransactionsModal'

export function Planet() {
  const { planetID } = useParams<{ planetID: string }>()
  const { data, isLoading } = useFetchPlanetByID(planetID)
  const [opened, { open, close }] = useDisclosure(false)

  const usersID = data?.residents || []

  const {
    transactions = [],
    filterByDate,
    filterByStatus,
    filterByCurrency
  } = useTransactionFilters({
    planetID: data?.id,
    usersID
  })

  if (isLoading) {
    // TODO: add skeleton
    return <p>loading planet...</p>
  }

  function handleBlockClick() {
    open()
  }

  const rows = transactions.map((transaction) => (
    <Table.Tr key={transaction.id}>
      <Table.Td>{transaction.amount}</Table.Td>
      <Table.Td>{transaction.currency}</Table.Td>
      <Table.Td>{transaction.date}</Table.Td>
      <Table.Td>{transaction.status}</Table.Td>
      <Table.Td>{transaction.user}</Table.Td>
    </Table.Tr>
  ))

  return (
    <>
      <Stack>
        <Group justify='space-between'>
          <Title order={2}>Welcome to {data?.name}</Title>
          <Button variant='outline' color='red' onClick={handleBlockClick}>
            Block transactions
          </Button>
        </Group>
        <Paper shadow='lg' withBorder p='xl'>
          <Stack>
            <Group justify='space-between'>
              <Text size='lg'>Transactions</Text>
              <CumulativeTransactions planetID={planetID} usersID={usersID} />
            </Group>
            <TransactionFilters
              filterByDate={filterByDate}
              filterByStatus={filterByStatus}
              filterByCurrency={filterByCurrency}
            />
            <Table horizontalSpacing='md' verticalSpacing='sm'>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Amount</Table.Th>
                  <Table.Th>Currency</Table.Th>
                  <Table.Th>Date</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>User</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </Stack>
        </Paper>
      </Stack>

      <BlockTransactionsModal
        transactions={transactions}
        opened={opened}
        close={close}
      />
    </>
  )
}

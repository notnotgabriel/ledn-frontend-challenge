import { Table, Paper, Button, Title, Stack } from '@mantine/core'
import { Link } from 'react-router-dom'
import { useFetchPlanets } from './hooks/useFetchPlanets'

export function PlanetList() {
  const { data: planets, isFetching } = useFetchPlanets()

  if (isFetching) {
    // TODO: add skeleton
    return <p data-testid='loading-planets'>Loading planets...</p>
  }

  if (!planets || !planets.length) {
    return <p>No planets to show yet</p>
  }

  const rows = planets.map((planet) => (
    <Table.Tr key={planet.id}>
      <Table.Td>{planet.name}</Table.Td>
      <Table.Td>{planet.transactions?.length}</Table.Td>
      <Table.Td align='right'>
        <Button component={Link} to={`/planet/${planet.id}`}>
          Transactions {`->`}
        </Button>
      </Table.Td>
    </Table.Tr>
  ))

  return (
    <Stack>
      <Title order={1}>Planets</Title>
      <Paper shadow='xs' p='xl'>
        <Table
          stickyHeader
          stickyHeaderOffset={80}
          horizontalSpacing='md'
          verticalSpacing='sm'
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Planet Name</Table.Th>
              <Table.Th>Total transactions</Table.Th>
              <Table.Th ta='right'>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Paper>
    </Stack>
  )
}

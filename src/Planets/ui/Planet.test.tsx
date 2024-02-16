import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Router from 'react-router-dom'
import fetchMock from 'jest-fetch-mock'

import { renderer } from '../../test/renderer'
import mockPlanets from '../../mockData/planets'
import mockTransactions from '../../mockData/transactions'

import { Planet } from './Planet'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn()
}))

const planetID = '1'

describe('Planet', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it('should render the planet screen', async () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ planetID })
    const transactions = [
      mockTransactions[0],
      mockTransactions[1],
      mockTransactions[2]
    ]

    fetchMock.mockResponse((req) => {
      if (req.url === '/api/planets/1') {
        return Promise.resolve(
          JSON.stringify({
            planet: mockPlanets[0]
          })
        )
      }

      if (req.url.includes('/api/transactions/users')) {
        return Promise.resolve(
          JSON.stringify({
            transactions
          })
        )
      }

      if (req.url.includes('/api/exchange-rate')) {
        return Promise.resolve(
          JSON.stringify({
            rate: '1.064696'
          })
        )
      }

      if (req.url.includes('/api/transactions/update-batch')) {
        return Promise.resolve(
          JSON.stringify({
            message: 'Batch of transactions updated successfully',
            transactions
          })
        )
      }

      return Promise.resolve('')
    })

    renderer(<Planet />)
      .withReactQuery()
      .withRouter()
      .render()

    await waitForElementToBeRemoved(() =>
      screen.queryByTestId('loading-planet')
    )

    expect(
      screen.getByRole('heading', {
        name: /welcome to tatooine/i
      })
    ).toBeVisible()

    await waitForElementToBeRemoved(() =>
      screen.queryByTestId('loading-transactions')
    )

    expect(
      within(screen.getByTestId('total-ics')).getByText(/Total ICS/i)
    ).toBeVisible()
    expect(
      within(screen.getByTestId('total-ics')).getByText(/\$ 4,003.23/i)
    ).toBeVisible()

    expect(
      within(screen.getByTestId('total-gcs')).getByText(/Total GCS/i)
    ).toBeVisible()
    expect(
      within(screen.getByTestId('total-gcs')).getByText(/\$ 4,262.22/i)
    ).toBeVisible()

    expect(within(screen.getByTestId('rate')).getByText(/Rate/i)).toBeVisible()
    expect(within(screen.getByTestId('rate')).getByText(/1.06/i)).toBeVisible()

    // N of transactions + table heading row
    expect(screen.getAllByRole('row')).toHaveLength(transactions.length + 1)

    const firstTransactionRow = screen.getAllByRole('row')[1]

    expect(within(firstTransactionRow).getByText(/\$ 7,976.02/i)).toBeVisible()
    expect(within(firstTransactionRow).getByText(/ICS/i)).toBeVisible()
    expect(
      within(firstTransactionRow).getByText(/2024-09-08T10:21:15Z/i)
    ).toBeVisible()
    expect(within(firstTransactionRow).getByText(/completed/i)).toBeVisible()
    expect(within(firstTransactionRow).getByText(/^4/i)).toBeVisible()

    userEvent.click(
      screen.getByRole('button', {
        name: /block transactions/i
      })
    )

    await waitFor(() => {
      expect(
        screen.getByRole('heading', {
          name: /block in progress transactions/i
        })
      ).toBeVisible()
    })

    const dialog = screen.getByRole('dialog', {
      name: /block in progress transactions/i
    })

    userEvent.click(
      within(dialog).getByRole('button', {
        name: /block transactions/i
      })
    )

    await waitFor(() => {
      expect(fetchMock).toHaveBeenLastCalledWith(
        '/api/transactions/update-batch',
        {
          body: JSON.stringify({
            transactions: [mockTransactions[1]]
          }),
          method: 'PUT'
        }
      )
    })
  })

  it.todo('should filter the transactions')
})

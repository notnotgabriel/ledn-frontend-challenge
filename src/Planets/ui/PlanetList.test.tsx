import {
  screen,
  waitForElementToBeRemoved,
  within
} from '@testing-library/react'

import fetchMock from 'jest-fetch-mock'

import { renderer } from '../../test/renderer'
import mockPlanets from '../../mockData/planets'
import mockTransactions from '../../mockData/transactions'
import { PlanetList } from './PlanetList'

describe('PlanetList', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })
  it('should render a list of planets', async () => {
    const numberOfPlanetsWithResidents = 49

    fetchMock.mockResponseOnce((req) => {
      if (req.url === '/api/planets') {
        return Promise.resolve(
          JSON.stringify({
            planets: mockPlanets
          })
        )
      }
      return Promise.resolve('')
    })

    fetchMock.mockResponseOnce((req) => {
      if (req.url.includes('/api/transactions/users')) {
        return Promise.resolve(
          JSON.stringify({
            transactions: [
              mockTransactions[0],
              mockTransactions[1],
              mockTransactions[2]
            ]
          })
        )
      }
      return Promise.resolve('')
    })

    renderer(<PlanetList />)
      .withReactQuery()
      .withRouter()
      .render()

    await waitForElementToBeRemoved(() =>
      screen.queryByTestId('loading-planets')
    )

    expect(screen.getAllByRole('row')).toHaveLength(
      numberOfPlanetsWithResidents
    )

    const firstPlanetRow = screen.getAllByRole('row')[1]

    expect(within(firstPlanetRow).getByText(/Tatooine/)).toBeVisible()
    expect(within(firstPlanetRow).getByText(/3/)).toBeVisible()

    expect(
      within(firstPlanetRow).getByRole('link', {
        name: /transactions \->/i
      })
    ).toHaveAttribute('href', `/planet/1`)
  })
})

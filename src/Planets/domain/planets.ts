import { type Transaction } from './transactions'

export type Planet = {
  name: string
  residents: string[]
  id: string
  transactions?: Transaction[]
}

export type RawPlanets = {
  planets: Planet[]
}

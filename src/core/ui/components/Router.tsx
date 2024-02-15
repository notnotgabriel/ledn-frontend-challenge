import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PlanetList } from '../../../Planets/ui/PlanetList'
import { Planet } from '../../../Planets/ui/Planet'
import { AppShell } from './AppShell'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AppShell>
        <PlanetList />
      </AppShell>
    )
  },
  {
    path: '/planet/:planetID',
    element: (
      <AppShell>
        <Planet />
      </AppShell>
    )
  }
])

export function Router() {
  return <RouterProvider router={router} />
}

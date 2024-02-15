import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import 'react-toastify/dist/ReactToastify.css'

import { MantineProvider } from '@mantine/core'

import { QueryProvider } from './infra/QueryProvider'
import { ReactQueryDevtools } from './infra/QueryDevTools'
import { Router } from './ui/components/Router'

function App() {
  return (
    <QueryProvider>
      <MantineProvider
        theme={{
          fontFamily: '"Roboto", sans-serif'
        }}
      >
        <Router />
      </MantineProvider>
      <ReactQueryDevtools />
    </QueryProvider>
  )
}

export default App

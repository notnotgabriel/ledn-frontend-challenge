import type { ReactElement } from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import {
  QueryClient,
  QueryClientProvider,
  type QueryClientConfig
} from '@tanstack/react-query'

import { MantineProvider } from '@mantine/core'
import { BrowserRouter } from 'react-router-dom'

const renderWithReactQuery = (
  children: ReactElement,
  config?: QueryClientConfig
) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    },
    ...config
  })

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

const renderWithRouter = (children: ReactElement) => {
  return <BrowserRouter>{children}</BrowserRouter>
}

class Renderer {
  protected rendered: ReactElement

  constructor(children: ReactElement) {
    this.rendered = children
  }

  withReactQuery(config?: QueryClientConfig) {
    this.rendered = renderWithReactQuery(this.rendered, config)

    return this
  }

  withRouter() {
    this.rendered = renderWithRouter(this.rendered)

    return this
  }

  render(options?: RenderOptions) {
    return render(<MantineProvider>{this.rendered}</MantineProvider>, options)
  }
}

export function renderer(children: ReactElement) {
  return new Renderer(children)
}

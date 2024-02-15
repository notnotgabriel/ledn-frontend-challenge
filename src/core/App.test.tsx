import { renderer } from '../test/renderer'

import App from './App'

describe('App', () => {
  it('should render app without throw', () => {
    expect(() =>
      renderer(<App />)
        .withReactQuery()
        .render()
    ).not.toThrow()
  })
})

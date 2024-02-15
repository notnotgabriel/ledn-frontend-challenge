import { AppShell as MantineAppShell, Group, Text, Image } from '@mantine/core'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import logo from '../assets/images/coruscant_logo.svg'

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <MantineAppShell
      header={{ height: { base: 60, md: 70, lg: 80 } }}
      padding='md'
    >
      <MantineAppShell.Header>
        <Group h='100%' px='md'>
          <Link to='/'>
            <Image h={45} w='auto' fit='contain' src={logo} />
          </Link>
          <Text size='md' fw='bold'>
            Coruscant Bank
          </Text>
        </Group>
      </MantineAppShell.Header>
      <MantineAppShell.Main px='xl'>{children}</MantineAppShell.Main>
      <ToastContainer />
    </MantineAppShell>
  )
}

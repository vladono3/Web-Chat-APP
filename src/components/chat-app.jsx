import { MantineProvider, AppShell, Modal, Button, Textarea } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { LoginProvider } from './login-provider'

import { ChatControls } from './chat-controls'
import ChatDiscussions from './chat-discussions'
import { ChatInput } from './chat-input'
import { ChatMessages } from './chat-messages'
import { theme } from '../theme'
import '@mantine/core/styles.css'
import { AuthenticationForm } from './chat-login'

export function ChatApp() {
  return (
    <LoginProvider>
      <MantineProvider theme={theme}>
        <AppShell
          header={{ height: 60}}
          navbar={{
            width: 300,
          }}
          padding="md" className='bg-custom-color text-white'>


          <AppShell.Header className='bg-navbar-color' >
            <ChatControls/>
          </AppShell.Header>


          <AppShell.Navbar className='bg-custom-color'>
            <ChatDiscussions/>
          </AppShell.Navbar>

          <AppShell.Main>
            <ChatMessages/>
          </AppShell.Main>
        </AppShell>

      </MantineProvider>
    </LoginProvider>
  )
}

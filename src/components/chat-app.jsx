import { MantineProvider, AppShell, Modal, Button, Textarea, AppShellFooter } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { LoginProvider } from './login-provider'

import { ChatControls } from './chat-controls'
import {ChatDiscussions} from './chat-discussions'
import { ChatInput } from './chat-input'
import { ChatMessages } from './chat-messages'
import { theme } from '../theme'
import '@mantine/core/styles.css'
import { AuthenticationForm } from './chat-login'
import { useState } from 'react'

export function ChatApp() {
  const [discussion, selectDiscussion] = useState()
  const [contact, addContact] = useState()
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
            <ChatControls addContact={addContact}/>
          </AppShell.Header>


          <AppShell.Navbar className='bg-custom-color'>
            <ChatDiscussions contact={contact} addContact={addContact} discussion={discussion} selectDiscussion={selectDiscussion}/>
          </AppShell.Navbar>

          <AppShell.Main>
            <ChatMessages discussion={discussion} selectDiscussion={selectDiscussion}/>
          </AppShell.Main>
        </AppShell>

      </MantineProvider>
    </LoginProvider>
  )
}

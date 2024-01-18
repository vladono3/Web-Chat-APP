import { MantineProvider, AppShell, Modal, Button, Textarea } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { ChatControls } from './chat-controls'
import { ChatContacts } from './chat-contacts'
import { ChatDiscussions } from './chat-discussions'
import { ChatInput } from './chat-input'
import { ChatMessages } from './chat-messages'

import { theme } from '../theme'
import '@mantine/core/styles.css'

export function ChatApp() {
  const [modalIsVisible, { open: openModal, close: closeModal }] = useDisclosure(false)

  return (
    <MantineProvider theme={theme}>
      <AppShell
        header={{ height: 60}}
        navbar={{
          width: 250,
        }}
        padding="md" className='bg-custom-color text-white'>


        <AppShell.Header className='bg-navbar-color' >
          <ChatControls/>
        </AppShell.Header>


        <AppShell.Navbar p="md" className='bg-custom-color'>
          <ChatDiscussions/>
        </AppShell.Navbar>

        <AppShell.Main >
          <p >Hello</p>

          <Button variant="outline" onClick={() => openModal()} > 
            Open modal
          </Button>

          <Modal opened={modalIsVisible} onClose={closeModal} title="Authentication">
            Lista cu persoane o sa vina in interior
          </Modal>

          <Textarea
            label="Input label"
            description="Input description"
            placeholder="Input placeholder"
          />
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  )
}

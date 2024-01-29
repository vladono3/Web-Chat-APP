import { MantineProvider, AppShell, Modal, Button, Textarea, AppShellFooter } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useLogin } from './login-provider'
import {ChatDiscussions} from './chat-discussions'
import { ChatInput } from './chat-input'
import { ChatMessages } from './chat-messages'
import { DISCUSSIONS_ENDPOINT, API_SELF } from '../constants/constants'
import { theme } from '../theme'
import '@mantine/core/styles.css'
import { AuthenticationForm } from './chat-login'
import { useState,useEffect } from 'react'

export function ChatApp() {
  const [alldiscussions, selectAlldiscussions] = useState();
  const [discussion, selectDiscussion] = useState();
  const [messages, setMessages] = useState([]);
  const { isLoggedIn } = useLogin();
  const [User, setUser] = useState("");
  const [loginIsVisible, {open: showLogin, close: hideLogin}] = useDisclosure(true)
  const [Username, setUsername] = useState("User");
  async function fetchDiscussions() {
    const custom_fetch = `${API_SELF}${DISCUSSIONS_ENDPOINT}/?user_id=${User}`;
    const response = await fetch(custom_fetch);
    const data = await response.json();
    return data;
  }

  async function loadDiscussions() {
    const data = await fetchDiscussions();
    selectAlldiscussions(data);
  }

  useEffect(() => {
      loadDiscussions();
  }, [User])

  return (
      <div>
        {isLoggedIn ? <MantineProvider theme={theme}>
      <AppShell
        navbar={{
          width: 300,
        }}
        padding="md" className='bg-custom-color text-white'>

        <AppShell.Navbar className='bg-custom-color'>
          <ChatDiscussions 
          messages={messages}
          setMessages={setMessages} 
          discussion={discussion} 
          selectDiscussion={selectDiscussion}
          alldiscussions={alldiscussions}
          User={User}
          setUser={setUser}
          Username={Username}
          />
        </AppShell.Navbar>

        <AppShell.Main>
          <ChatMessages 
          messages={messages} 
          setMessages={setMessages} 
          discussion={discussion} 
          selectDiscussion={selectDiscussion}
          User={User}
          setUser={setUser}
          />
        </AppShell.Main>
      </AppShell>

    </MantineProvider>: 
    <MantineProvider>
      <AppShell
        navbar={{
          width: 300,
        }}
        padding="md" className='bg-custom-color text-white'>
      <AppShell.Main>
          <Modal className="flex mt-2 ml-2" size={350} opened={loginIsVisible} onClose={hideLogin}>
          <AuthenticationForm setUser={setUser} hidelogin={hideLogin} setusername={setUsername}/>
        </Modal>
      </AppShell.Main>
      </AppShell>
    </MantineProvider>
    }
    </div>
  )
}

import { ChatApp } from './components/chat-app'
import { LoginProvider } from './components/login-provider'
export function App() {
  return (
    <LoginProvider>
      <ChatApp />
    </LoginProvider>
  )
}

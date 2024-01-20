import { useLogin } from "./login-provider";
export default function ChatDiscussions() {
  const { isLoggedIn, login, logout } = useLogin();
  return (
      <>
        {isLoggedIn ? <div>
          <ul title="Discussions">
            <li>User 1</li>
            <li>User 2</li>
            <li>User 3</li>
            <li>User 4</li>
            <li>User 5</li>
          </ul>
          </div>
        : <h1>LOG IN First!</h1>}
      </>
  )
}

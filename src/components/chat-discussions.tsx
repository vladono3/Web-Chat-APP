import { useLogin } from "./login-provider";
import ChatList from "./chat-app-discussion-chatlist";
import { useState, useEffect } from "react";
import { USER_ID } from "../constants/constants";
import { API,CONTACTS_ENDPOINT } from "../constants/constants";

async function fetchDiscussions() {
  const response = await fetch(`${API}${CONTACTS_ENDPOINT}`)
  const data = await response.json()
  return data
}

export default function ChatDiscussions() {
  const [discussions, setDiscussions] = useState([])
  const { isLoggedIn } = useLogin()

  async function loadDiscussions() {
    const data = await fetchDiscussions()
    setDiscussions(data)
  }
  useEffect(() => {
    loadDiscussions()
  }, [])

  return (
      <>
        {isLoggedIn ? 
        <div className="m-2 overflow-auto">
          {discussions.map((discussion) =>(
            <ChatList userName={discussion.name}/>
          ))}
        </div>
        : <></>}
      </>
  )
}

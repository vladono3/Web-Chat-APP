import { useLogin } from "./login-provider";
import { useState, useEffect } from "react";
import { USER_ID } from "../constants/constants";
import { DISCUSSIONS_ENDPOINT, CONTACT_ENDPOINT, API_SELF } from "../constants/constants";
import { Skeleton,Card, Button, Avatar } from "@mantine/core";

async function fetchDiscussions() {
  const custom_fetch = `${API_SELF}${DISCUSSIONS_ENDPOINT}/?user_id=${USER_ID}`;
  const response = await fetch(custom_fetch);
  const data = await response.json();
  return data;
}


export function ChatDiscussions({contact, addContact, discussion, selectDiscussion}) {
  const [discussions, setDiscussions] = useState([]);
  const { isLoggedIn } = useLogin();

  async function loadDiscussions() {
    const data = await fetchDiscussions();
    setDiscussions(data);
  }

  useEffect(() => {
    loadDiscussions();
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <div className="m-2">
          {discussions.map((discussion)=> 
                <Card onClick={() => selectDiscussion(discussion.id)}
              className="cursor-pointer mt-2"
              shadow="md"
              padding="sm"
              key={discussion.id}
              radius="md">{discussion.name}
              </Card>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

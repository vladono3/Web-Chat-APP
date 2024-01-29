import { useLogin } from "./login-provider";
import { useState, useEffect } from "react";
import { DISCUSSIONS_ENDPOINT, CONTACT_ENDPOINT, API_SELF } from "../constants/constants";
import { Skeleton,Card, Button, Avatar, Modal } from "@mantine/core";
import { NewChatModal } from "./chat-app-newchat";
import GroupIcon from "../assets/group-icon";
import UserIcon from "../assets/user-icon";
import { AuthenticationForm } from "./chat-login";
import { useDisclosure } from "@mantine/hooks";

export function ChatDiscussions({messages, setMessages, discussion, selectDiscussion, alldiscussions, User, setUser, Username}) {
  const { isLoggedIn } = useLogin();
  return (
    <><div className="flex h-20 border-b-2 bg-navbar-color border-b-navbar-color p-4">
          <h2 className="mt-4 absolute top-3 text-custom-color">
          Hello, {Username}!
          </h2>
          
          <div className="absolute top-3 right-3">
            <NewChatModal User={User}/>
          </div>
          </div>
      {isLoggedIn ? (
        <div className="mx-3">
          {alldiscussions.map((discussion)=>
                 <div
                 onClick={() => selectDiscussion(discussion.id)}
                 key={discussion.id}
                 className="flex items-center p-4 border-b border-gray-300 hover:bg-gray-100 cursor-pointer"
               >
                 <div className="mr-3">
                 {discussion.contacts.length > 2 ? <GroupIcon /> : <UserIcon />}
                 </div>
                 <div className="flex-grow">
                   <div className="flex items-center justify-between">
                     <div className="text-lg font-semibold">{discussion.name}</div>
                   </div>
                   <div className="text-gray-500 text-sm overflow-hidden overflow-ellipsis whitespace-nowrap">
                    Something...
                   </div>
                 </div>
               </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

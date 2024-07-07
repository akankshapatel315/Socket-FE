import { Fragment, useEffect, useState } from "react";
import socketIO from "socket.io-client";
import { ChatArea } from "../ChatArea/ChatArea";
const socket = socketIO("http://localhost:4000");
import "./chat.css";
import axios from "axios";
import { ListGroup } from "react-bootstrap";

export const Chat = () => {
  const [connectedUsers, setConnectedUsers] = useState<any>([]);
  const [selectedUser, setSelectedUser] = useState<any>("");
  const [oneToOneChat, setOneToOneChat] = useState<any>([]);
  const [chat, setChat] = useState("");

  useEffect(() => {
    axios.get("http://localhost:4000/user/userlist").then((res) => {
      setConnectedUsers(res.data.userList);
    });
  }, []);

  useEffect(() => {
    const name: any = localStorage.getItem("user") || "Akanksha";
    socket.emit("setup", name);
  }, []);

  useEffect(() => {
    console.log("called");
    socket.on("message recieved", (data) => {
      console.log("data", data);
      setOneToOneChat([...oneToOneChat, data]);
    });
  });

  const sendChat = () => {
    socket.emit("chatMsg", {
      sender: localStorage.getItem("user"),
      msg: chat,
      receiver: selectedUser,
    });
    setOneToOneChat([
      ...oneToOneChat,
      {
        sender: localStorage.getItem("user"),
        msg: chat,
        receiver: selectedUser,
      },
    ]);
    setChat("");
  };

  const handleOnChange = (e: any) => {
    setChat(e.target.value);
  };

  return (
    <Fragment>
          <div className="position-absolute top-0 start-0 w-25 mt-4 p-3 mb-5">
            <div>
            {connectedUsers.length > 0 &&
              connectedUsers.map((user: any) => {
                return (
                  <>
                    <ListGroup as="ul" className="mt-2">
                      <ListGroup.Item
                        as="li"
                        active
                        className="mt-4  w-75 container cursor-pointe rounded-pill"
                        role="button"
                        onClick={() => setSelectedUser(user.firstname)}
                      >
                        {user.firstname}
                      </ListGroup.Item>
                    </ListGroup>
                  </>
                );
              })}
            </div>
          </div>
          <ChatArea
            chatMsg={chat}
            sendChat={sendChat}
            handleOnChange={handleOnChange}
            selectedUser={selectedUser}
            messages={oneToOneChat}
          />
    </Fragment>
  );
};

// export default Chat

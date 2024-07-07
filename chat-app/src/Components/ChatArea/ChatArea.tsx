import { Fragment } from "react/jsx-runtime";
import "./chatarea.css";
import { Button, Form } from "react-bootstrap";
export const ChatArea = ({
  sendChat,
  chatMsg,
  handleOnChange,
  selectedUser,
  messages,
}: any) => {
  return (
    <div className="card rounded shadow p-3 mb-5 bg-body rounded w-75 position-absolute mt-4 end-0">
      <div className="h-25 rounded-pill border-to">
        <h6 className="mx-4 my-2">To:{selectedUser}</h6>
      </div>
        {messages.map((chat: any, index: number) => {
          return (
            <div
              key={index}
              className={
                selectedUser === chat.receiver
                  ? "ml-6  w-25 mt-2  bg-blue rounded-pill "
                  : "mr-6 w-25 mt-2  bg-grey rounded-pill "
              }
            >
              <img
                src="https://media.geeksforgeeks.org/wp-content/uploads/20220123013311/gfg.png"
                alt="Sender Avatar"
                className="avatar"
              />
              {chat.msg}
            </div>
          );
        })}
      <Form.Control
        type="text"
        className="mt-2 rounded-pill"
        placeholder="Type your message..."
        onChange={handleOnChange}
        value={chatMsg}
        onKeyDown={(e) => {
          if (e.key === "Enter") sendChat();
        }}
      />
    </div>
  );
};

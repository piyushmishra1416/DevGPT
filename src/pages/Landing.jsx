import React, { useEffect, useRef, useState } from "react";
import { Header } from "../components/Header";
import { makeApiRequest } from "../Openai";
import man from "../assets/man.png";
import chatgpt from "../assets/chatgpt.svg";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import ResponsiveDrawer from "../components/Sidebar";

const Landing = () => {
  const msgEnd = useRef(null);

  const [input, setInput] = useState("");
  const [activeChatIndex, setActiveChatIndex] = useState(0);
  const [chats, setChats] = useState([
    {
      messages: [
        {
          text: "Hello! How can I assist you today?",
          isBot: true,
        },
      ],
    },
  ]);
  const token = "a28d1fb0c93613d4e00160aeedb47542a9a0e16f";
  useEffect(() => {
    msgEnd.current.scrollIntoView();
  }, []);

  const handleSend = async () => {
    const text = input;
    setInput("");
    const updatedChats = [...chats];
    const activeChat = updatedChats[activeChatIndex];

    activeChat.messages.push({
      text,
      isBot: false,
    });

    try {
      const responseData = await makeApiRequest(text, token);

      console.log(responseData.copies[0].content);

      activeChat.messages.push({
        text: responseData.copies[0].content,
        isBot: true,
      });

      setChats(updatedChats);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleEnter = async (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
      await handleSend();
    }
  };

  return (
    <div className="flex items-center justify-center p-5 ">
      <div className="bg-zinc-90 w-[] h-screen">
        <ResponsiveDrawer chats={chats} setChats={setChats} setActiveChatIndex={setActiveChatIndex} />
      </div>
      <div className="w-[80%]  bg-blac h-auto flex flex-col justify-end items-cente p-10">
        <div className="chats">
          {chats[activeChatIndex].messages.map((message, i) => (
            <div key={i} className="flex space-x-2  py-4 ">
              <img
                src={message.isBot ? chatgpt : man}
                alt="dp"
                className=" h-10 w-10"
              />
              <p className="">{message.text}</p>
            </div>
          ))}
          <div ref={msgEnd} />
        </div>
        <div className="chatfooter w-[100%] h-[20%]">
          <div className=" bg-violet-950 w-[80%] text-white flex p-4 h-[80%] rounded-lg">
            <input
              type="text"
              name=""
              className="bg-violet-950 w-[100%]"
              id=""
              placeholder="Send a Message"
              value={input}
              onKeyDown={handleEnter}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />{" "}
            <button className="send" onClick={handleSend}>
              {" "}
              <SendRoundedIcon fontSize="large" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};



export default Landing;

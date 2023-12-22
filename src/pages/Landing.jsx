import React, { useEffect, useRef, useState } from "react";
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
  const token = "ea27f1b64c148e10d9aaba69170bd5566abe4931";
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

  useEffect(() => {
    try {
      localStorage.setItem("chats", JSON.stringify(chats));
    } catch (error) {
      console.error("Error saving chats to local storage:", error);
    }
  }, [chats]);

  useEffect(() => {
    try {
      const savedChats = localStorage.getItem("chats");
      if (savedChats) {
        setChats(JSON.parse(savedChats));
      }
    } catch (error) {
      console.error("Error loading chats from local storage:", error);
    }
  }, []);

  return (
    <div className="flex items-end p-5 mt-5 bg-[#343541] ">
      <div className="bg-zinc-90 w-[] h-screen">
        <ResponsiveDrawer
          chats={chats}
          setChats={setChats}
          setActiveChatIndex={setActiveChatIndex}
        />
      </div>
      <div className="  bg- h-auto flex w-[100%] max-w-[850px] flex-col  p-10">
        <div className="rounded-lg bg-[#000000] mb-4 text-white px-3">
          {chats[activeChatIndex]?.messages?.map((message, i) => (
            <div
              key={i}
              className="flex space-x-4 ${message.isBot ? 'bg-[#000000]' : 'bg-[#c75151]'}   py-4 "
            >
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
        <div className="chatfooter  ">
          <div className=" bg-stone-900 text-white w-[100%] flex p-4 rounded-lg">
            <input
              type="text"
              name=""
              className="bg-stone-900 w-[100%]"
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
          <p className="ml-3">DevGPT may display inaccurate info, including about people, so double-check its responses.</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;

import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import axios from "axios";
import { getAllMessagesRoute, sendMessageRoute } from "../utils/APIRoutes";
import {v4 as uuidv4} from "uuid";
// import socket from 'socket.io-client';

export default function ChatContainer({ currentChat, currentUser, socket }) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    const fetchMessages = async () => {
      if (!currentUser || !currentUser._id || !currentChat || !currentChat._id) {
        return;
      }
      try {
        const response = await axios.post(getAllMessagesRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, [currentChat, currentUser]);

  const handleSendMsg = async (msg) => {
    if (!currentUser || !currentChat) return;
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });
    setMessages((prevMessages) => [
      ...prevMessages,
      { fromSelf: true, message: msg },
    ]);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({
          fromSelf: false,
          message: msg,
        });
      });
    }
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!currentChat) return null;

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt="avatar"
            />
          </div>
        </div>
        <div className="username">
          <h3>{currentChat.username}</h3>
        </div>
      </div>
      <Logout/>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div ref={scrollRef} key={uuidv4()}>
            <div className={`message ${message.fromSelf ? "sended" : "recieved"}`}>
              <div className="content">
                <p>{message.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div`
  padding-top: 1rem;
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow-x:hidden;
  align-items: center;
  padding: 0 2rem;
  scroll-behavior: smooth;

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }

  .chat-header {
    display: flex;
    align-items: center;
    padding: 0 6rem;
    color: white;

    .user-details {
      display: flex;
      align-items: center;
      gap: 1.5rem;

      .avatar {
        img {
          height: 3rem;
          position: relative;
          top: -1px;
          left: 120px;
        }
      }

      .username {
        h3 {
          margin-left: 1rem;
          padding: 0.5rem;
        }
      }
    }
  }

  .chat-messages {
    position: relative;
    color: white;
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
     &::-webkit-scrollbar {
      width: 0.2rem;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #ffffff39;
      border-radius: 1rem;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }
    }

  .message {
    display: flex;
    align-items: center;

    .content {
      max-width: 90%;
      overflow-wrap: break-word;
      padding: 1rem;
      font-size: 1.1rem;
      border-radius: 1rem;
      color: red;
    }
  }

  .sended {
    justify-content: flex-end;
    .content {
      background-color: #4f04ff21;
      align-self: flex-end;
    }
  }

  .recieved {
    // justify-content: flex-start;
    position:relative;
    left:90px;
    .content {
      background-color: #9900ff20;
      align-self: flex-start;

      justify-content: flex-end;
    .content {
      background-color: #4f04ff21;
      align-self: flex-end;
    }
  }
`;
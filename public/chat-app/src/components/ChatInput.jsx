import React, { useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";


  export default function ChatInput({ handleSendMsg }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emoji) => {
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
    setShowEmojiPicker(false);
  };
  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form className="input-container" onSubmit={(e) => sendChat(e)}>
        <input
          type="text"
          placeholder="Please type your message here"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <div className="submit" onClick={sendChat}>
          <IoMdSend />
        </div>
      </form>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: #080420;
  padding: 0.5rem 2rem;
  border-top: 1px solid #2c2c2e;
  position: relative;
  right: -120px;
  border-radius: 14px;
  bottom: 10px;
  width:50%;

  .button-container {
    display: flex;
    align-items: center;

    .emoji {
      position: relative;
      right: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.5rem;
      cursor: pointer;
      color: #ffd700; /* Golden color for emoji */
    }

    /* Style for emoji picker */
    .emoji-picker-react {
      position: absolute;
      bottom: 60px; /* Adjust based on your layout */
      right: 50px; /* Adjust to position the picker */
      background-color: #1e1e1e; /* Background color for the picker */
      border: 1px solid #2c2c2e; /* Border to match input */
      border-radius: 10px; /* Rounded corners */
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* Shadow for depth */
    }
  }
  .emoji-categories {
    button {
      filter: contrast(0);
    }
  }
  .emoji-search {
    background-color: transparent;
    border-color: #9a86f3;
  }
  .emoji-group:before {
    background-color: #080420;
  }

  .input-container {
    position: relative;
    right: 60px;
    display: flex;
    align-items: center;
    width: 100%;
    background-color: #1e1e1e;
    border-radius: 8px;
    padding: 0.5rem;
      overflow:auto;

    input {
      position: relative;
      right: -10px;
      width: 100%;
      padding: 0.5rem;
      background: transparent;
      border: none;
      color: #ffffff;
      font-size: 1rem;
      outline: none;

      &::placeholder {
        color: yellow;
      }
    }

    .submit {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.3rem ;
      border-radius: 50%;
      background-color: #4e0eff;
      cursor: pointer;
      margin-left: 0.5rem;
      

      svg {
        font-size: 1.3rem;
        color: white;
      }
    }
  }

  @media (max-width: 720px) {
    padding: 0.5rem 1rem;
    .emoji {
      font-size: 1.3rem;
    }
    input {
      font-size: 0.9rem;
    }
    .submit svg {
      font-size: 1.1rem;
    }
  }
`;

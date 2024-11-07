import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// import axios from "axios";
import { BiPowerOff } from "react-icons/bi";

export default function Logout() {
  const navigate = useNavigate();
  const handleClick = async () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  );
}
const Button = styled.button`
display: flex;
justify-content: center;
align-items: center;
width: 50px;
height: 50px;
padding: 0.5rem;
border-radius: 0.5rem;
background-color: #9a86f3;
border: none;
cursor: pointer;
position: absolute;
top: 1rem;
right: 1.5rem;
top:9%;
right:140px;
svg {
  font-size: 1.3rem;
  color: #ebe7ff;
}

`;

import React, { useState,useEffect } from "react";
import styled from "styled-components";
import { Link , useNavigate} from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { LoginRoute } from "../utils/APIRoutes";

const Login= () => {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(()=>{
    if(localStorage.getItem('chat-user-app')){
      navigate("/chat")
    }
  },[navigate]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password,username, } = values;
      const { data } = await axios.post(LoginRoute, {
        username,
        password,
      });
      // console.log(data);
      if(data.status===false){
        toast.error(data.msg, toastOptions);
      }
      if(data.status===true){
        localStorage.setItem('chat-app-user',JSON.stringify(data.user));
        navigate("/chat");
      }
    }
  };

  const handleValidation = () => {
    // console.log(" in validation",registerRoute);
    const { password,username} = values;
    if (password ==="") {
      toast.error(
        "Email and Password is required.",
        toastOptions
      );
      return false;
    } else if (username.length==="") {
      toast.error(
        "Email and Password is required.",
        toastOptions
      );
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <div className="brand">
          <img src={Logo} alt="logo" />
          <h1>Snappy</h1>
        </div>
        <input
          type="text"
          placeholder="Username"
          name="username"
          autoComplete="on"
          onChange={handleChange}
          min="3"
        />
        
        <input
          type="password"
          placeholder="Password"
          name="password"
          autoComplete="on"
          onChange={handleChange}
        />
        <button type="submit">LogIn</button>
        <span>
         Don't have an account? <Link to="/register">Register</Link>
        </span>
      </form>
      <ToastContainer />
    </FormContainer>
  );
};

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    img {
      height: 5rem;
    }

    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }

  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;

    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
  background-color: #997af0;
  color: white;
  padding: 1rem 2rem;
  border: none;
  font-weight: bold; /* Correct this */
  cursor: pointer;
  border-radius: 0.4rem;
  font-size: 1rem; /* Correct this */
  text-transform: uppercase;
  transition: 0.5s ease-in-out;
  &:hover {
    background-color: #4e0eff;
  }
}


  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      text-size: bold;
    }
  }
`;

export default Login;

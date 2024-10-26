import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Buffer } from "buffer"; // Buffer polyfill
import { setAvatarRoutes } from "../utils/APIRoutes";

export default function SetAvatar() {
  const api = "https://api.multiavatar.com/45678945";
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastOptions = useMemo(
    () => ({
      position: "bottom-right",
      autoClose: 8000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    }),
    []
  );

  useEffect(() => {
    const checkUser = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      }
    };

    checkUser();
  }, [navigate]);

  const setProfilePicture = async () => {
    try {
      if (selectedAvatar === undefined) {
        toast.error("Please select an avatar", toastOptions);
      } else {
        const user = JSON.parse(localStorage.getItem("chat-app-user"));
        const { data } = await axios.post(`${setAvatarRoutes}/${user._id}`, {
          image: avatars[selectedAvatar],
        });
        // console.log(data);
        if (data.isSet) {
          user.isAvatarImageSet = true;
          user.avatarImage = data.image;
          localStorage.setItem("chat-app-user", JSON.stringify(user));
          navigate("/login");
        } else {
          toast.error(
            "Error while setting up an avatar, please try again later",
            toastOptions
          );
        }
      }
    } catch (error) {
      console.error(
        "Error setting profile picture:",
        error.response ? error.response.data : error.message
      );
      toast.error(
        "Error setting profile picture: " +
          (error.response ? error.response.data : error.message),
        toastOptions
      );
    }
  };

  useEffect(() => {
    const fetchAvatars = async () => {
      const data = [];
      let retries = 0;
      const maxRetries = 5;

      while (retries < maxRetries) {
        try {
          const response = await axios.get(
            `${api}/${Math.round(Math.random() * 1000)}`,
            { responseType: "text" }
          );
          const buffer = Buffer.from(response.data, "utf-8");
          const base64String = buffer.toString("base64");
          data.push(base64String);
          if (data.length === 4) break; // Exit loop if we have enough avatars
        } catch (error) {
          if (error.response && error.response.status === 429) {
            console.log("Rate limit exceeded. Retrying...");
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Retry after delay
            retries++;
          } else {
            console.error("Error fetching avatar:", error.message);
            toast.error(
              "Error fetching avatars, please try again later",
              toastOptions
            );
            break;
          }
        }
      }
      setAvatars(data);
      setIsLoading(false);
    };

    fetchAvatars();
  }, [toastOptions]);

  return (
    <>
      <Container>
        <div className="title-container">
          <h1>Pick an Avatar as your Profile Picture</h1>
        </div>
        {isLoading ? (
          <img src={loader} alt="Loading..." className="loader" />
        ) : (
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                  onClick={() => setSelectedAvatar(index)} // Corrected onClick function
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                  />
                </div>
              );
            })}
          </div>
        )}
        <button onClick={setProfilePicture} className="submit-btn">
          Set as Profile Picture
        </button>
      </Container>
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
    width: 40%;
    height: 40%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }

  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: 0.2s ease-in-out;

      &.selected {
        border-color: #4e0eff;
      }

      img {
        height: 6rem;
      }
    }
  }

  .submit-btn {
    background-color: #997af0;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;

    &:hover {
      background-color: #4e0eff;
    }
  }
`;

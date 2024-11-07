// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const userRoutes = require("./routes/userRoutes");
// const messageRoute = require("./routes/messagesRoute");
// const socket = require("socket.io");

// const app = express();
// require("dotenv").config();

// app.use(cors());
// app.use(express.json());

// app.use("/api/auth", userRoutes);
// app.use("/api/messages", messageRoute);

// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(() => {
//     console.log("db connection successful");
//   })
//   .catch((err) => {
//     console.error("db connection error: ", err);
//   });

// const server = app.listen(process.env.PORT, () => {
//   console.log(`Server started on Port: ${process.env.PORT}`);
// });
// const io = socket(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     credentials: true,
//   },
// });
// global.onlineUsers = new Map();
// io.on("connection", (socket) => {
//   global.chatSocket = socket;
//   socket.on("add-user", (userId) => {
//     onlineUsers.set(userId, socket.id);
//   });

//   socket.on("send-msg", (data) => {
//     const sendUserSocket = onlineUsers.get(data.to);
//     if (sendUserSocket) {
//       socket.to(sendUserSocket).emit("msg-recieve", data.msg);
//     }
//   });
// });
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messageRoute = require("./routes/messagesRoute");
const socket = require("socket.io");
require("dotenv").config(); // Import .env file

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Routes setup
app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoute);

// Add a root route to avoid "Can't GET /"
app.get("/", (req, res) => {
  res.send("Welcome to the backend API!");
});
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ msg: "Something went wrong", status: false });
});

// Database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.error("DB connection error: ", err);
  });

// Error-handling middleware (Make sure it's placed after all routes)
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({
    msg: "Something went wrong! Please try again later.",
    error: err.message,
  });
});

// Start the server
const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started on Port: ${process.env.PORT || 5000}`);
});

// Setting up Socket.io
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000", // Adjust based on frontend URL
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;

  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});

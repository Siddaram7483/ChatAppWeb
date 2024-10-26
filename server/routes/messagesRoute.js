const { addMessage, getAllMessage } = require("../controllers/messagesController");
const express = require("express");

const router = express.Router(); // Use express.Router() directly

// Route for user registration
router.post("/addmsg/", addMessage);

// Route for user login
router.post("/getmsg/", getAllMessage);


module.exports = router;

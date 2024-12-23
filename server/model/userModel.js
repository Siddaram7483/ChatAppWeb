const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, // corrected
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true, // corrected
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: true, // corrected
    min: 8,
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  avatarImage: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("User", userSchema); // changed "Users" to "User"

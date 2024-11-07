// const User = require("../model/userModel");
// const bcrypt = require("bcrypt");

// //this logic is for register purpose
// module.exports.register = async (req, res, next) => {
//   try {
//     const { username, email, password } = req.body;

//     // Check if the username already exists
//     const usernameCheck = await User.findOne({ username });
//     if (usernameCheck) {
//       return res.json({ msg: "Username already used", status: false });
//     }

//     // Check if the email already exists
//     const emailCheck = await User.findOne({ email });
//     if (emailCheck) {
//       return res.json({ msg: "Email is already used", status: false });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({
//       email,
//       username,
//       password: hashedPassword,
//     });

//     // Convert to plain object and remove password
//     const userWithoutPassword = user.toObject();
//     delete userWithoutPassword.password;

//     return res.json({ status: true, user: userWithoutPassword });
//   } catch (ex) {
//     next(ex); // Pass error to the next middleware
//   }
// };

// //this logic is for login purpose

// module.exports.login = async (req, res, next) => {
//   try {
//     const { username, password } = req.body;

//     // Find the user by username
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.json({ msg: "Incorrect username or password", status: false });
//     }

//     // Compare the password with the stored hashed password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.json({ msg: "Incorrect username or password", status: false });
//     }

//     // Convert to plain object and remove password
//     const userWithoutPassword = user.toObject();
//     delete userWithoutPassword.password;

//     return res.json({ status: true, user: userWithoutPassword });
//   } catch (ex) {
//     next(ex); // Pass error to the next middleware
//   }
// };
// module.exports.setAvatar = async (req, res, next) => {
//   try {
//     const userId = req.params.id;
//     const avatarImage = req.body.image;

//     const userData = await User.findByIdAndUpdate(
//       userId,
//       {
//         isAvatarImageSet: true,
//         avatarImage,
//       },
//       { new: true }
//     ); // Return the modified document

//     if (!userData) {
//       return res.status(404).json({ msg: "User not found", status: false });
//     }

//     return res.json({
//       isSet: userData.isAvatarImageSet,
//       image: userData.avatarImage,
//     });
//   } catch (ex) {
//     console.error(ex);
//     next(ex);
//   }
// };

// // This is your server-side code
// module.exports.getAllUsers = async (req, res, next) => {
//   try {
//     const users = await User.find({ _id: { $ne: req.params.id } }).select([
//       "email",
//       "username",
//       "avatarImage",
//       "_id",
//     ]);
//     return res.json(users);
//   } catch (ex) {
//     next(ex);
//   }
// };
const User = require("../model/userModel");
const bcrypt = require("bcrypt");

// Register new user
module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check if the username already exists
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.status(409).json({ msg: "Username already used", status: false });
    }

    // Check if the email already exists
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.status(409).json({ msg: "Email is already used", status: false });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    // Convert to plain object and remove password
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return res.status(201).json({ status: true, user: userWithoutPassword });
  } catch (ex) {
    console.error("Error in register:", ex);
    next(ex); // Pass error to error-handling middleware
  }
};

// Login user
module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ msg: "Incorrect username or password", status: false });
    }

    // Compare the password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Incorrect username or password", status: false });
    }

    // Convert to plain object and remove password
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return res.json({ status: true, user: userWithoutPassword });
  } catch (ex) {
    console.error("Error in login:", ex);
    next(ex);
  }
};

// Set avatar image for user
module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;

    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    ); // Return the modified document

    if (!userData) {
      return res.status(404).json({ msg: "User not found", status: false });
    }

    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    console.error("Error in setAvatar:", ex);
    next(ex);
  }
};

// Get all users except the current user
module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    console.error("Error in getAllUsers:", ex);
    next(ex);
  }
};


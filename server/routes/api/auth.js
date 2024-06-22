const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/user");

// @route       POST api/auth
// @description Authenticate User and get token
// access       Public

router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      // See if the user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ errors: [{ msg: "User Not Found!" }] });
      }

      const isMatch = await password === user.password;
      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: "Invalid Password!" }] });
      }


      const userResponse = {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        isActive: user.isActive,
        friends: user.friends,
        friendRequestsSent: user.friendRequestsSent,
        friendRequestsReceived: user.friendRequestsReceived
        // Add any other fields you want to include here
      };


      res.json(userResponse);


    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;

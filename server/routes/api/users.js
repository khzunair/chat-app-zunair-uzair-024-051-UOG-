const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// Model
const User = require("../../models/user.js");



/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Register new User in DB.
 *     description: A POST Request which creates a new user with name,email and password to save a new user in the database.
 *     responses:
 *       200:
 *         description: Returns Created user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: The user full name.
 *                         example: Zunair Khawaja  
 *                       email:
 *                         type: string
 *                         description: The user email
 *                         example: zunairkwj@gmail.com
 *                       password:
 *                         type: string
 *                         description: The user password
 *                         example: abc123d
 */
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // See if the user exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ errors: [{ msg: "User already exists!" }] });
      }

      // Get user's gravatar
      // const avatar = gravatar.url(email, {
      //   s: "200",
      //   r: "pg",
      //   d: "mm",
      // });

      const isActive = "1";

      user = new User({
        name,
        email,
        // avatar,
        password,
        isActive,
      });


      await user.save();

      // Return user details without the password
      const userResponse = {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        isActive: user.isActive,
        friends:user.friends,
        friendRequestsSent:user.friendRequestsSent,
        friendRequestsReceived:user.friendRequestsReceived
        // Add any other fields you want to include here
      };

      res.json(userResponse);

    } catch (err) {
      console.error(err.message);
      res.status(500).send({"msg":"Server Error"});
    }
  }
);

module.exports = router;

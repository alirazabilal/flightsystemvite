const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Adjust path as needed
const fetching = require("../middlewares/fetching");

const JWT_SECRET = "aliisagoodb#oy";

// Route to handle user registration
router.post(
  "/signup",
  [
    body("name", "ENTER A VALID NAME").isLength({ min: 3 }),
    body("email", "ENTER A VALID EMAIL").isEmail(),
    body("password", "INVALID PASSWORD").isLength({ min: 5 }),
    body("contact", "INVALID contact").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    const { name, email, password, contact } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "User with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      user = new User({
        name,
        email,
        password: hashedPassword,
        contact,
      });

      await user.save();

      success = true;
      const payload = {
        user: {
          id: user.id,
        },
      };

      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

      res.json({ success, token });
    } catch (err) {
      console.error(success, err.message);
      res.status(500).send("Server error");
    }
  }
);
router.post(
  "/login",
  [
    body("email", "enter a valid email").isEmail(),
    body("password", "enter a password , cant be blank").exists(),
  ],
  async (req, res) => {
    let success = false;

    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ error: err.array() });
    }
    const { email, password } = req.body;

    try {
      let user_get = await User.findOne({ email });
      if (!user_get) {
        success = false;
        return res.status(400).json({ error: "wrong credentials entered" });
      }
      const passwordCompare = await bcrypt.compare(password, user_get.password);
      if (!passwordCompare) {
        success = false;
        return res.status(400).json({ success, error: "wrong credentials" });
      }
      const data = {
        user: {
          id: user_get.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

router.post("/getuser", fetching, async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password");

    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});
module.exports = router;

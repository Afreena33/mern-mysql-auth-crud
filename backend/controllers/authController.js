const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= REGISTER =================
const register = async (req, res) => {
  console.log("REGISTER HIT");

  const { name, email, phone, password } = req.body;

  try {
    const [users] = await db.query(
      "SELECT * FROM users WHERE email=?",
      [email]
    );

    if (users.length > 0) {
      return res.json({ msg: "User already exists" });
    }

    const hash = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (name,email,phone,password) VALUES (?,?,?,?)",
      [name, email, phone, hash]
    );

    res.json({ msg: "Registered successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ================= LOGIN =================
const login = async (req, res, next) => {
  try {
    console.log("LOGIN HIT");

    const { email, password } = req.body;

    const [users] = await db.query(
      "SELECT * FROM users WHERE email=?",
      [email]
    );

    if (users.length === 0) {
      return res.json({ msg: "User not found" });
    }

    const user = users[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.json({ msg: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ msg: "Login successful", token });

  } catch (err) {
    console.log("LOGIN ERROR:", err);
    next(err);
  }
};

// ================= FORGOT PASSWORD =================
const forgotPassword = async (req, res) => {
  console.log("FORGOT HIT");

  const { email } = req.body;

  const token = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    const [result] = await db.query(
      "UPDATE users SET reset_token=? WHERE email=?",
      [token, email]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "Email not found" });
    }

    // 👇 For testing we return token
    res.json({ msg: "Token generated", token });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ================= RESET PASSWORD =================
const resetPassword = async (req, res) => {
  console.log("RESET HIT");

  const { email, token, newPassword } = req.body;

  try {
    const [users] = await db.query(
      "SELECT * FROM users WHERE email=? AND reset_token=?",
      [email, token]
    );

    if (users.length === 0) {
      return res.json({ msg: "Invalid token" });
    }

    const hash = await bcrypt.hash(newPassword, 10);

    await db.query(
      "UPDATE users SET password=?, reset_token=NULL WHERE email=?",
      [hash, email]
    );

    res.json({ msg: "Password updated successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ================= GET ME =================
const getMe = (req, res) => {
  res.json(req.user);
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  getMe
};
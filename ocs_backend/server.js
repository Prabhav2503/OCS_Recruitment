require("dotenv").config();
const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const { Client } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Supabase database connection
const db = new Client({
  connectionString: process.env.SUPABASE_URL,
  ssl: { rejectUnauthorized: false },
});
db.connect();

// Function to hash passwords using MD5
function md5Hash(password) {
  return crypto.createHash("md5").update(password).digest("hex");
}

// 🚀 **Login API**
app.post("/login", async (req, res) => {
  const { userid, password } = req.body;
  const hashedPassword = md5Hash(password);

  try {
    // Query database for user
    const query = "SELECT * FROM users WHERE userid = $1 AND password_hash = $2";
    const result = await db.query(query, [userid, hashedPassword]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = result.rows[0];

    // If admin, return all users; otherwise, return only logged-in user's data
    if (user.role === "admin") {
      const allUsers = await db.query("SELECT userid,password_hash ,role FROM users");
      return res.json(allUsers.rows);
    } else {
      return res.json({ userid: user.userid,password_hash: user.password_hash ,role: user.role });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// 🚀 **Start the Server**
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

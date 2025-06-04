import express from "express";
/* import Seller from "../models/Seller.js"; */
import db from "../db/index.js";

const router = express.Router();



// Register or login seller (simple version)
router.post("/register", async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    // Check if seller exists
    const [rows] = await db.query("SELECT * FROM sellers WHERE email = ?", [email]);
    if (rows.length > 0) {
      return res.status(400).json({ message: "Seller already exists" });
    }
    // Insert new seller
    await db.query(
      "INSERT INTO sellers (name, email, password, phone) VALUES (?, ?, ?, ?)",
      [name, email, password, phone]
    );
    res.status(201).json({ message: "Seller registered" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  /* const { name, email, password, phone } = req.body;
  try {
    // Check if seller exists
    let seller = await Seller.findOne({ email });
    if (seller) {
      return res.status(400).json({ message: "Seller already exists" });
    }
    seller = new Seller({ name, email, password, phone });
    await seller.save();
    res.status(201).json({ message: "Seller registered", seller });
  } catch (err) {
    res.status(500).json({ message: err.message });
  } */
});

// Login seller (simple version)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await db.query("SELECT * FROM sellers WHERE email = ? AND password = ?", [email, password]);
    if (rows.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    res.json({ message: "Login successful", seller: rows[0] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM sellers");
    res.json({ sellers: rows });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



export default router;
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import Transaction from "./src/models/Transaction.js";

dotenv.config();
await connectDB();

// Replace this with your actual user _id
const USER_ID = "699049d395d866b2c76b5cfd";

const transactions = [
  // ===== DECEMBER 2025 =====
  { user: USER_ID, title: "December Salary", amount: 58000, type: "income", category: "Salary", date: new Date("2025-12-01") },
  { user: USER_ID, title: "Freelance Logo Design", amount: 12000, type: "income", category: "Side Hustle", date: new Date("2025-12-15") },

  { user: USER_ID, title: "Groceries", amount: 3800, type: "expense", category: "Food", date: new Date("2025-12-05") },
  { user: USER_ID, title: "Electricity Bill", amount: 2400, type: "expense", category: "Utilities", date: new Date("2025-12-08") },
  { user: USER_ID, title: "Shopping Festival", amount: 9000, type: "expense", category: "Shopping", date: new Date("2025-12-18") },
  { user: USER_ID, title: "Health Checkup", amount: 2000, type: "expense", category: "Health", date: new Date("2025-12-22") },

  // ===== JANUARY 2026 =====
  { user: USER_ID, title: "January Salary", amount: 60000, type: "income", category: "Salary", date: new Date("2026-01-01") },
  { user: USER_ID, title: "Stock Dividend", amount: 7000, type: "income", category: "Investments", date: new Date("2026-01-14") },

  { user: USER_ID, title: "Groceries", amount: 4200, type: "expense", category: "Food", date: new Date("2026-01-06") },
  { user: USER_ID, title: "Uber Rides", amount: 1500, type: "expense", category: "Transport", date: new Date("2026-01-09") },
  { user: USER_ID, title: "House Rent", amount: 15000, type: "expense", category: "Housing", date: new Date("2026-01-05") },
  { user: USER_ID, title: "Netflix + Spotify", amount: 799, type: "expense", category: "Entertainment", date: new Date("2026-01-12") },
  { user: USER_ID, title: "Insurance Premium", amount: 5000, type: "expense", category: "Insurance", date: new Date("2026-01-20") },

  // ===== FEBRUARY 2026 (Current Month) =====
  { user: USER_ID, title: "February Salary", amount: 61000, type: "income", category: "Salary", date: new Date("2026-02-01") },
  { user: USER_ID, title: "Small Business Profit", amount: 15000, type: "income", category: "Business", date: new Date("2026-02-12") },

  { user: USER_ID, title: "Groceries", amount: 3900, type: "expense", category: "Food", date: new Date("2026-02-03") },
  { user: USER_ID, title: "Petrol", amount: 2800, type: "expense", category: "Transport", date: new Date("2026-02-07") },
  { user: USER_ID, title: "Electricity Bill", amount: 2600, type: "expense", category: "Utilities", date: new Date("2026-02-10") },
  { user: USER_ID, title: "Weekend Trip", amount: 8000, type: "expense", category: "Travel", date: new Date("2026-02-15") },
  { user: USER_ID, title: "Online Course", amount: 7000, type: "expense", category: "Education", date: new Date("2026-02-18") },
];

const seedData = async () => {
  try {
    await Transaction.deleteMany({ user: USER_ID });
    await Transaction.insertMany(transactions);
    console.log("Data seeded successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();

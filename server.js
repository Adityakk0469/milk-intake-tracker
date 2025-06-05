// Local SQLite Server Option
const express = require("express")
const sqlite3 = require("sqlite3").verbose()
const cors = require("cors")
const path = require("path")

console.log("🗄️ SETTING UP LOCAL SQLITE SERVER")
console.log("=".repeat(40))

const app = express()
const PORT = 3000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.static("public"))

// Create/connect to database
const db = new sqlite3.Database("milk_tracker.db", (err) => {
  if (err) {
    console.error("❌ Error opening database:", err.message)
  } else {
    console.log("✅ Connected to SQLite database")

    // Create table if it doesn't exist
    db.run(
      `CREATE TABLE IF NOT EXISTS milk_entries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT NOT NULL,
            quantity REAL NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`,
      (err) => {
        if (err) {
          console.error("❌ Error creating table:", err.message)
        } else {
          console.log("✅ Database table ready")
        }
      },
    )
  }
})

// Routes
// Get all entries
app.get("/api/entries", (req, res) => {
  db.all("SELECT * FROM milk_entries ORDER BY date DESC", [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message })
      return
    }
    res.json({ entries: rows })
  })
})

// Add new entry
app.post("/api/entries", (req, res) => {
  const { date, quantity } = req.body

  if (!date || !quantity) {
    res.status(400).json({ error: "Date and quantity are required" })
    return
  }

  db.run("INSERT INTO milk_entries (date, quantity) VALUES (?, ?)", [date, quantity], function (err) {
    if (err) {
      res.status(400).json({ error: err.message })
      return
    }
    res.json({
      id: this.lastID,
      date: date,
      quantity: quantity,
    })
  })
})

// Delete entry
app.delete("/api/entries/:id", (req, res) => {
  const id = req.params.id

  db.run("DELETE FROM milk_entries WHERE id = ?", id, function (err) {
    if (err) {
      res.status(400).json({ error: err.message })
      return
    }
    res.json({ deleted: this.changes })
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Server running at http://localhost:${PORT}`)
  console.log(`📊 API endpoints:`)
  console.log(`   GET  /api/entries     - Get all entries`)
  console.log(`   POST /api/entries     - Add new entry`)
  console.log(`   DELETE /api/entries/id - Delete entry`)
  console.log(`\n💡 To use this:`)
  console.log(`   1. Save this as 'server.js'`)
  console.log(`   2. Run: npm install express sqlite3 cors`)
  console.log(`   3. Run: node server.js`)
  console.log(`   4. Update your HTML to use this API`)
})

// Handle shutdown
process.on("SIGINT", () => {
  db.close((err) => {
    if (err) {
      console.error(err.message)
    }
    console.log("\n👋 Database connection closed")
    process.exit(0)
  })
})

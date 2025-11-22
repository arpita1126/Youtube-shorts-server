import express from "express"
import cors from "cors"
import feedRouter from "./routes/feed"
import networkRouter from "./routes/network"
import eventsRouter from "./routes/events"

const app = express()

app.use(cors())
app.use(express.json())

if (process.env.NODE_ENV !== "production") {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`)
    next()
  })
}

app.use("/feed", feedRouter)
app.use("/network-profile", networkRouter)
app.use("/events", eventsRouter)

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: Date.now() })
})

app.use((req, res) => {
  res.status(404).json({ error: "Not found" })
})

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Error:", err)
  res.status(500).json({ error: "Internal server error" })
})

const PORT = Number(process.env.PORT || 4000)
app.listen(PORT, () => {
  console.log(`🚀 UltraLite Backend running on http://localhost:${PORT}`)
})

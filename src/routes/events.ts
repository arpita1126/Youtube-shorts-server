import { Router, type Request, type Response } from "express"
import type { LogEvent } from "../types"

const router = Router()

let events: LogEvent[] = []
const LOG_RETENTION = Number(process.env.LOG_RETENTION || 1000)

router.post("/log", (req: Request, res: Response) => {
  try {
    const body = req.body || {}

    const event: LogEvent = {
      event: body.event,
      timestamp: Date.now(),
      bandwidth: body.bandwidth,
      video_id: body.video_id,
      data_saver: body.data_saver,
      mode: body.mode,
    }

    events.push(event)

    if (events.length > LOG_RETENTION) {
      events.shift()
    }

    return res.json({ success: true, eventCount: events.length })
  } catch (error) {
    console.error("Event logging error:", error)
    return res.status(400).json({ success: false, error: "Failed to log event" })
  }
})

router.get("/log", (req: Request, res: Response) => {
  return res.json({ events, count: events.length })
})

router.delete("/log", (req: Request, res: Response) => {
  events = []
  return res.json({ success: true, message: "All events cleared" })
})

export default router

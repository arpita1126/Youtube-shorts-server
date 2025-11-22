import { Router, type Request, type Response } from "express"
import type { NetworkProfile } from "../types"

const router = Router()

router.get("/", (req: Request, res: Response<NetworkProfile>) => {
  const bandwidth_kbps = Math.floor(Math.random() * 600) + 50
  const latency_ms = Math.floor(Math.random() * 200) + 50

  let recommended: "text" | "audio" | "video" = "video"
  if (bandwidth_kbps < 150) {
    recommended = "text"
  } else if (bandwidth_kbps < 300) {
    recommended = "audio"
  }

  const userAgent = req.headers["user-agent"] || ""
  const device_type = userAgent.toLowerCase().includes("mobile") ? "mobile" : "desktop"

  const response: NetworkProfile = {
    bandwidth_kbps,
    recommended,
    latency_ms,
    device_type,
  }

  return res.json(response)
})

export default router

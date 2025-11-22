// Backend type definitions

export interface Video {
  id: string
  title: string
  thumbnail: string
  video_low: string
  audio_only: string
  transcript: string
  duration: number
  language: string
}

export interface FeedResponse {
  videos: Video[]
  count: number
  total: number
  cacheable: boolean
}

export interface NetworkProfile {
  bandwidth_kbps: number
  recommended: "text" | "audio" | "video"
  latency_ms: number
  device_type: "mobile" | "desktop"
}

export interface LogEvent {
  event: "feed_loaded" | "playback_started" | "mode_switched" | "offline_usage"
  timestamp: number
  bandwidth?: number
  video_id?: string
  data_saver?: boolean
  mode?: "text" | "audio" | "video"
}

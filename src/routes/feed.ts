import { Router, type Request, type Response } from "express"
import type { FeedResponse, Video } from "../types"

const router = Router()

const SAMPLE_VIDEOS: Video[] = [
  { 
    id: "ykHAZ5krZSs", 
    title: "YouTube Video 1", 
    thumbnail: "https://img.youtube.com/vi/ykHAZ5krZSs/default.jpg", 
    video_low: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/ForBiggerBlazes.mp4", 
    audio_only: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", 
    transcript: "This is a sample video demonstrating video playback in the UltraLite Shorts app.", 
    duration: 45, 
    language: "English" 
  },
  { 
    id: "KJfz9ChQ0A0", 
    title: "YouTube Video 2", 
    thumbnail: "https://img.youtube.com/vi/KJfz9ChQ0A0/default.jpg", 
    video_low: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/ElephantsDream.mp4", 
    audio_only: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", 
    transcript: "Another sample video showing the adaptive playback capabilities of the app.", 
    duration: 38, 
    language: "English" 
  },
  { 
    id: "PF2TjY06nzc", 
    title: "YouTube Video 3", 
    thumbnail: "https://img.youtube.com/vi/PF2TjY06nzc/default.jpg", 
    video_low: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4", 
    audio_only: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", 
    transcript: "Sample video content for testing bandwidth adaptive features.", 
    duration: 52, 
    language: "English" 
  },
  { 
    id: "rY44ViY45q8", 
    title: "YouTube Video 4", 
    thumbnail: "https://img.youtube.com/vi/rY44ViY45q8/default.jpg", 
    video_low: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/Sintel.mp4", 
    audio_only: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", 
    transcript: "Sample video for the UltraLite Shorts application testing.", 
    duration: 41, 
    language: "English" 
  },
  { 
    id: "5", 
    title: "Caching strategies for web apps", 
    thumbnail: "/caching-strategies.jpg", 
    video_low: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/SubaruOutbackOnStreetAndDirt.mp4", 
    audio_only: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", 
    transcript: "Effective caching strategies using localStorage, IndexedDB, and service workers. Build truly offline-first applications.", 
    duration: 35, 
    language: "English" 
  },
  { 
    id: "6", 
    title: "Data saver mode implementation", 
    thumbnail: "/data-saver.jpg", 
    video_low: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/TearsOfSteel.mp4", 
    audio_only: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", 
    transcript: "How to implement data saver modes in web applications. Reduce data usage by 80% while maintaining functionality.", 
    duration: 48, 
    language: "English" 
  },
  { 
    id: "7", 
    title: "Progressive enhancement guide", 
    thumbnail: "/progressive-enhancement.jpg", 
    video_low: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/VolkswagenGTIReview.mp4", 
    audio_only: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", 
    transcript: "Progressive enhancement principles for building resilient web apps. Start with basic functionality and enhance as network allows.", 
    duration: 40, 
    language: "English" 
  },
  { 
    id: "8", 
    title: "Video compression techniques", 
    thumbnail: "/video-compression.jpg", 
    video_low: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/WeAreGoingOnBullrun.mp4", 
    audio_only: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", 
    transcript: "Learn video compression techniques for 144p streaming. Balance quality and bandwidth usage for low-bandwidth networks.", 
    duration: 44, 
    language: "English" 
  },
  { 
    id: "9", 
    title: "Audio-only content strategy", 
    thumbnail: "/audio-content.jpg", 
    video_low: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/WhatCarsDontBuy.mp4", 
    audio_only: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", 
    transcript: "Why audio-only content works great for low bandwidth. Design engaging audio experiences for users on tight networks.", 
    duration: 36, 
    language: "English" 
  },
  { 
    id: "10", 
    title: "Performance budgeting for mobile", 
    thumbnail: "/performance-budget.jpg", 
    video_low: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BlenderBlenderDemo1080p.mp4", 
    audio_only: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", 
    transcript: "Implement performance budgets for mobile web apps. Keep page sizes under 100KB for fast loading on 3G networks.", 
    duration: 39, 
    language: "English" 
  }
]

router.get("/", (req: Request, res: Response<FeedResponse>) => {
  const limit = Math.min(Number(req.query.limit || 10), 50)
  const bandwidth = Number(req.query.bandwidth || 500)
  const dataSaver = req.query.dataSaver === "true"

  let adaptiveLimit = limit
  if (dataSaver) {
    adaptiveLimit = Math.min(5, limit)
  } else if (bandwidth < 100) {
    adaptiveLimit = Math.min(3, limit)
  } else if (bandwidth < 150) {
    adaptiveLimit = Math.min(5, limit)
  } else if (bandwidth < 300) {
    adaptiveLimit = Math.min(8, limit)
  } else if (bandwidth < 400) {
    adaptiveLimit = Math.min(10, limit)
  }

  const videos = SAMPLE_VIDEOS.slice(0, adaptiveLimit).map((v) => ({
    id: v.id,
    title: v.title,
    thumbnail: v.thumbnail,
    video_low: dataSaver ? "" : v.video_low,
    audio_only: v.audio_only,
    transcript: v.transcript,
    duration: v.duration,
    language: v.language,
  }))

  const response: FeedResponse = {
    videos,
    count: videos.length,
    total: SAMPLE_VIDEOS.length,
    cacheable: true,
  }

  res.set("Cache-Control", "public, max-age=300")
  return res.json(response)
})

export default router

"use client"

import { useEffect, useRef } from "react"

export function EmotionWheel() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = 300
    canvas.height = 300

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const outerRadius = 120
    const innerRadius = 40

    // Define emotion segments
    const emotions = [
      { name: "Joy", color: "#4ade80", intensity: 0.8 },
      { name: "Love", color: "#f472b6", intensity: 0.6 },
      { name: "Fear", color: "#a78bfa", intensity: 0.3 },
      { name: "Anger", color: "#ef4444", intensity: 0.2 },
      { name: "Sadness", color: "#3b82f6", intensity: 0.4 },
      { name: "Surprise", color: "#facc15", intensity: 0.5 },
      { name: "Disgust", color: "#84cc16", intensity: 0.1 },
      { name: "Trust", color: "#06b6d4", intensity: 0.9 },
    ]

    const segmentAngle = (2 * Math.PI) / emotions.length

    // Draw emotion wheel
    emotions.forEach((emotion, index) => {
      const startAngle = index * segmentAngle
      const endAngle = startAngle + segmentAngle

      // Draw outer segment
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle)
      ctx.closePath()
      ctx.fillStyle = emotion.color + "40" // Add transparency
      ctx.fill()

      // Draw intensity segment
      const intensityRadius = innerRadius + (outerRadius - innerRadius) * emotion.intensity
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, intensityRadius, startAngle, endAngle)
      ctx.closePath()
      ctx.fillStyle = emotion.color
      ctx.fill()

      // Add label
      const labelRadius = outerRadius + 20
      const labelX = centerX + Math.cos(startAngle + segmentAngle / 2) * labelRadius
      const labelY = centerY + Math.sin(startAngle + segmentAngle / 2) * labelRadius

      ctx.font = "12px sans-serif"
      ctx.fillStyle = "#64748b"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(emotion.name, labelX, labelY)
    })

    // Draw center circle
    ctx.beginPath()
    ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI)
    ctx.fillStyle = "#f8fafc"
    ctx.fill()
    ctx.strokeStyle = "#e2e8f0"
    ctx.lineWidth = 2
    ctx.stroke()

    // Add animation effect
    let animationFrame = 0
    const animate = () => {
      animationFrame = requestAnimationFrame(animate)

      // Pulse effect on the active emotions
      const time = Date.now() / 1000
      emotions.forEach((emotion, index) => {
        if (emotion.intensity > 0.5) {
          const startAngle = index * segmentAngle
          const endAngle = startAngle + segmentAngle

          // Calculate pulsing radius
          const pulseAmount = Math.sin(time * 2 + index) * 5
          const pulseRadius = innerRadius + (outerRadius - innerRadius) * emotion.intensity + pulseAmount

          // Clear previous pulse
          ctx.beginPath()
          ctx.moveTo(centerX, centerY)
          ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle)
          ctx.closePath()
          ctx.fillStyle = emotion.color + "40"
          ctx.fill()

          // Draw new pulse
          ctx.beginPath()
          ctx.moveTo(centerX, centerY)
          ctx.arc(centerX, centerY, pulseRadius, startAngle, endAngle)
          ctx.closePath()
          ctx.fillStyle = emotion.color
          ctx.fill()
        }
      })
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <div className="flex justify-center">
      <canvas ref={canvasRef} className="max-w-full" />
    </div>
  )
}

"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface BodyMapProps {
  onSelectBodyPart: (part: string) => void
  selectedPart: string | null
}

export function BodyMap({ onSelectBodyPart, selectedPart }: BodyMapProps) {
  const [hoveredPart, setHoveredPart] = useState<string | null>(null)

  // Define body parts with more detailed paths for a better looking human figure
  const bodyParts = [
    {
      id: "head",
      label: "Head",
      path: "M50,15 C58,15 64,21 64,30 C64,39 58,45 50,45 C42,45 36,39 36,30 C36,21 42,15 50,15 Z",
    },
    {
      id: "face",
      label: "Face",
      path: "M50,25 C54,25 57,28 57,32 C57,36 54,39 50,39 C46,39 43,36 43,32 C43,28 46,25 50,25 Z",
    },
    {
      id: "neck",
      label: "Neck",
      path: "M45,45 L55,45 L55,52 L45,52 Z",
    },
    {
      id: "chest",
      label: "Chest",
      path: "M42,52 L58,52 L60,75 L40,75 Z",
    },
    {
      id: "abdomen",
      label: "Abdomen",
      path: "M40,75 L60,75 L58,95 L42,95 Z",
    },
    {
      id: "pelvis",
      label: "Pelvis",
      path: "M42,95 L58,95 L60,105 L40,105 Z",
    },
    {
      id: "leftShoulder",
      label: "Left Shoulder",
      path: "M42,52 L30,60 L28,65 L38,65 L42,60 Z",
    },
    {
      id: "rightShoulder",
      label: "Right Shoulder",
      path: "M58,52 L70,60 L72,65 L62,65 L58,60 Z",
    },
    {
      id: "leftArm",
      label: "Left Arm",
      path: "M28,65 L25,85 L35,85 L38,65 Z",
    },
    {
      id: "rightArm",
      label: "Right Arm",
      path: "M72,65 L75,85 L65,85 L62,65 Z",
    },
    {
      id: "leftForearm",
      label: "Left Forearm",
      path: "M25,85 L22,105 L32,105 L35,85 Z",
    },
    {
      id: "rightForearm",
      label: "Right Forearm",
      path: "M75,85 L78,105 L68,105 L65,85 Z",
    },
    {
      id: "leftHand",
      label: "Left Hand",
      path: "M22,105 L20,115 L34,115 L32,105 Z",
    },
    {
      id: "rightHand",
      label: "Right Hand",
      path: "M78,105 L80,115 L66,115 L68,105 Z",
    },
    {
      id: "leftThigh",
      label: "Left Thigh",
      path: "M40,105 L35,140 L45,140 L45,105 Z",
    },
    {
      id: "rightThigh",
      label: "Right Thigh",
      path: "M60,105 L65,140 L55,140 L55,105 Z",
    },
    {
      id: "leftLeg",
      label: "Left Leg",
      path: "M35,140 L33,175 L47,175 L45,140 Z",
    },
    {
      id: "rightLeg",
      label: "Right Leg",
      path: "M65,140 L67,175 L53,175 L55,140 Z",
    },
    {
      id: "leftFoot",
      label: "Left Foot",
      path: "M33,175 L30,185 L50,185 L47,175 Z",
    },
    {
      id: "rightFoot",
      label: "Right Foot",
      path: "M67,175 L70,185 L50,185 L53,175 Z",
    },
    {
      id: "back",
      label: "Back",
      path: "M42,52 L58,52 L60,75 L58,95 L42,95 L40,75 Z",
      hidden: true,
    },
  ]

  // Function to determine the color of a body part based on hover and selection state
  const getPartColor = (partId: string) => {
    if (selectedPart === partId) return "rgba(var(--primary), 0.7)"
    if (hoveredPart === partId) return "rgba(var(--primary), 0.4)"
    return "rgba(0, 0, 0, 0.08)"
  }

  // Function to determine the stroke color of a body part
  const getStrokeColor = (partId: string) => {
    if (selectedPart === partId) return "rgba(var(--primary), 1)"
    if (hoveredPart === partId) return "rgba(var(--primary), 0.8)"
    return "rgba(0, 0, 0, 0.3)"
  }

  return (
    <div className="relative w-full max-w-md mx-auto bg-white rounded-xl p-6 shadow-sm">
      <div className="aspect-[3/4] w-full">
        <svg viewBox="0 0 100 200" className="w-full h-full">
          <defs>
            <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(240, 240, 240, 1)" />
              <stop offset="100%" stopColor="rgba(220, 220, 220, 1)" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="rgba(0,0,0,0.3)" />
            </filter>
          </defs>

          {/* Base body silhouette */}
          <motion.path
            d="M50,15 C65,15 70,25 70,35 C70,45 65,50 58,52 L60,75 L58,95 L60,105 L65,140 L67,175 L70,185 L50,185 L30,185 L33,175 L35,140 L40,105 L42,95 L40,75 L42,52 C35,50 30,45 30,35 C30,25 35,15 50,15 Z"
            fill="url(#bodyGradient)"
            stroke="rgba(0,0,0,0.2)"
            strokeWidth="0.5"
            filter="url(#shadow)"
          />

          {/* Arms */}
          <motion.path
            d="M42,52 L30,60 L28,65 L25,85 L22,105 L20,115 L34,115 L32,105 L35,85 L38,65 L42,60 Z"
            fill="url(#bodyGradient)"
            stroke="rgba(0,0,0,0.2)"
            strokeWidth="0.5"
            filter="url(#shadow)"
          />
          <motion.path
            d="M58,52 L70,60 L72,65 L75,85 L78,105 L80,115 L66,115 L68,105 L65,85 L62,65 L58,60 Z"
            fill="url(#bodyGradient)"
            stroke="rgba(0,0,0,0.2)"
            strokeWidth="0.5"
            filter="url(#shadow)"
          />

          {/* Interactive body parts */}
          {bodyParts
            .filter((part) => !part.hidden)
            .map((part) => (
              <motion.path
                key={part.id}
                d={part.path}
                fill={getPartColor(part.id)}
                stroke={getStrokeColor(part.id)}
                strokeWidth={selectedPart === part.id || hoveredPart === part.id ? "0.8" : "0.5"}
                initial={{ opacity: 0.8 }}
                animate={{
                  opacity: selectedPart === part.id ? 1 : 0.8,
                  filter: selectedPart === part.id ? "url(#glow)" : "none",
                  scale: selectedPart === part.id ? 1.02 : 1,
                }}
                whileHover={{
                  opacity: 1,
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
                onClick={() => onSelectBodyPart(part.id)}
                onMouseEnter={() => setHoveredPart(part.id)}
                onMouseLeave={() => setHoveredPart(null)}
                className="cursor-pointer transition-all"
              />
            ))}

          {/* Joints and anatomical details */}
          <circle cx="50" cy="32" r="0.8" fill="#000" opacity="0.3" />
          <circle cx="28" cy="65" r="0.8" fill="#000" opacity="0.3" />
          <circle cx="72" cy="65" r="0.8" fill="#000" opacity="0.3" />
          <circle cx="25" cy="85" r="0.8" fill="#000" opacity="0.3" />
          <circle cx="75" cy="85" r="0.8" fill="#000" opacity="0.3" />
          <circle cx="35" cy="140" r="0.8" fill="#000" opacity="0.3" />
          <circle cx="65" cy="140" r="0.8" fill="#000" opacity="0.3" />
        </svg>
      </div>

      {/* Part label tooltip */}
      {hoveredPart && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-1/2 top-4 transform -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1.5 rounded-md text-sm font-medium shadow-md pointer-events-none z-10"
          style={{
            boxShadow: "0 4px 12px rgba(var(--primary), 0.25)",
          }}
        >
          {bodyParts.find((part) => part.id === hoveredPart)?.label}
        </motion.div>
      )}

      {/* Selected part indicator */}
      {selectedPart && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 bg-primary/10 border border-primary/20 rounded-md p-3"
        >
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
            <h3 className="font-medium text-primary">
              {bodyParts.find((part) => part.id === selectedPart)?.label} Selected
            </h3>
          </div>
          <p className="text-sm text-muted-foreground mt-1">Please select your symptoms related to this area</p>
        </motion.div>
      )}

      <div className="mt-6 bg-muted/30 rounded-lg p-4 border border-muted">
        <h3 className="text-sm font-medium mb-3">Select Body Region</h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {bodyParts
            .filter((part) => !part.hidden)
            .map((part) => (
              <motion.button
                key={part.id}
                className={`px-2 py-1.5 text-xs rounded-md transition-all ${
                  selectedPart === part.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-background hover:bg-muted/80 border border-muted"
                }`}
                onClick={() => onSelectBodyPart(part.id)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {part.label}
              </motion.button>
            ))}
        </div>
      </div>
    </div>
  )
}

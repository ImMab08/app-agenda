"use client"

import { useState, useEffect } from "react"

interface SidebarTooltipProps {
  text: string
  isVisible: boolean
  position: { x: number; y: number }
}

export function TooltipSidebar({ text, isVisible, position }: SidebarTooltipProps) {
  const [adjustedPosition, setAdjustedPosition] = useState(position)

  useEffect(() => {
    if (isVisible) {
      const viewportHeight = window.innerHeight
      let newY = position.y

      if (position.y + 40 > viewportHeight) {
        newY = position.y - 40
      }

      setAdjustedPosition({ x: position.x, y: newY })
    }
  }, [position, isVisible])

  if (!isVisible) return null

  return (
    <div
      className="fixed z-50 bg-blue-500 text-white text-sm px-2 py-1 rounded-r-md shadow-lg pointer-events-none"
      style={{
        left: `${adjustedPosition.x}px`,
        top: `${adjustedPosition.y}px`,
      }}
    >
      {text}
    </div>
  )
}

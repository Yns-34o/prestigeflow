"use client"

import React, { useState, useEffect, useMemo, useRef } from "react"
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion"

const IMG_WIDTH = 60
const IMG_HEIGHT = 85

function FlipCard({ src, index, phase, target }) {
  return (
    <motion.div
      animate={{
        x: target.x,
        y: target.y,
        rotate: target.rotation,
        scale: target.scale,
        opacity: target.opacity,
      }}
      transition={{
        type: "spring",
        stiffness: 60,
        damping: 22,
        mass: 0.8,
      }}
      style={{
        position: "absolute",
        width: IMG_WIDTH,
        height: IMG_HEIGHT,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className="cursor-pointer group"
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ rotateY: 180 }}
      >
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-gray-200"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img
            src={src}
            alt={`matcha-${index}`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />
        </div>

        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg flex flex-col items-center justify-center p-4 border"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "linear-gradient(135deg, #6b7a3a 0%, #4a5a2a 100%)",
            borderColor: "rgba(107,122,58,0.3)",
          }}
        >
          <div className="text-center">
            <p
              style={{
                fontSize: "8px",
                fontWeight: 700,
                color: "#d1c9b4",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "4px",
              }}
            >
              Matcha
            </p>
            <p style={{ fontSize: "12px", fontWeight: 500, color: "#f5f0e1" }}>
              Détails
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const TOTAL_IMAGES = 20
const MAX_SCROLL = 1800

const IMAGES = [
  "https://images.unsplash.com/photo-1556881286-fc6915169721?w=400&q=85",
  "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400&q=85",
  "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400&q=85",
  "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&q=85",
  "https://images.unsplash.com/photo-1571934811356-5cc061b6201f?w=400&q=85",
  "https://images.unsplash.com/photo-1615478503562-ec2d8aa0a24d?w=400&q=85",
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=85",
  "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=85",
  "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400&q=85",
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=85",
  "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=400&q=85",
  "https://images.unsplash.com/photo-1517256064527-8f67e42c22b7?w=400&q=85",
  "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=400&q=85",
  "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=400&q=85",
  "https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=400&q=85",
  "https://images.unsplash.com/photo-1529892485617-25f63cd7b1e9?w=400&q=85",
  "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400&q=85",
  "https://images.unsplash.com/photo-1558857563-b371033873b8?w=400&q=85",
  "https://images.unsplash.com/photo-1506765515384-028b60a970df?w=400&q=85",
  "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=400&q=85",
]

const lerp = (start, end, t) => start * (1 - t) + end * t

export default function IntroAnimation() {
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
  const containerRef = useRef(null)
  const lockRef = useRef(true) // lock scroll while animation is active

  useEffect(() => {
    if (!containerRef.current) return
    const handleResize = (entries) => {
      for (const entry of entries) {
        setContainerSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        })
      }
    }
    const observer = new ResizeObserver(handleResize)
    observer.observe(containerRef.current)
    setContainerSize({
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
    })
    return () => observer.disconnect()
  }, [])

  const virtualScroll = useMotionValue(0)
  const scrollRef = useRef(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleWheel = (e) => {
      if (!lockRef.current) return // scroll is released — let page scroll normally
      e.preventDefault()
      // Normalize delta for consistency across devices
      const delta = Math.abs(e.deltaY) < 50 ? e.deltaY * 2.5 : e.deltaY
      const newScroll = Math.min(Math.max(scrollRef.current + delta * 0.8, 0), MAX_SCROLL)
      scrollRef.current = newScroll
      virtualScroll.set(newScroll)

      // Release lock when user reaches end of animation
      if (newScroll >= MAX_SCROLL - 10) {
        lockRef.current = false
      }
    }

    let touchStartY = 0
    const handleTouchStart = (e) => {
      if (!lockRef.current) return
      touchStartY = e.touches[0].clientY
    }
    const handleTouchMove = (e) => {
      if (!lockRef.current) return
      e.preventDefault()
      const touchY = e.touches[0].clientY
      const deltaY = touchStartY - touchY
      touchStartY = touchY
      const newScroll = Math.min(Math.max(scrollRef.current + deltaY, 0), MAX_SCROLL)
      scrollRef.current = newScroll
      virtualScroll.set(newScroll)
      if (newScroll >= MAX_SCROLL - 10) {
        lockRef.current = false
      }
    }

    container.addEventListener("wheel", handleWheel, { passive: false })
    container.addEventListener("touchstart", handleTouchStart, { passive: false })
    container.addEventListener("touchmove", handleTouchMove, { passive: false })

    return () => {
      container.removeEventListener("wheel", handleWheel)
      container.removeEventListener("touchstart", handleTouchStart)
      container.removeEventListener("touchmove", handleTouchMove)
    }
  }, [virtualScroll])

  // Phase 3: morph circle -> arc (scroll 0-600)
  const morphProgress = useTransform(virtualScroll, [0, 600], [0, 1])
  const smoothMorph = useSpring(morphProgress, { stiffness: 80, damping: 26, mass: 0.6 })

  // Phase 4: scroll rotation on arc (scroll 600-1800)
  const scrollRotate = useTransform(virtualScroll, [600, 1800], [0, 360])
  const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 80, damping: 26, mass: 0.6 })

  // Auto-play intro: scatter -> line -> circle on mount
  const [introPhase, setIntroPhase] = useState("scatter")

  useEffect(() => {
    const t1 = setTimeout(() => setIntroPhase("line"), 500)
    const t2 = setTimeout(() => setIntroPhase("circle"), 2200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const mouseX = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 60, damping: 25 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      const relativeX = e.clientX - rect.left
      const normalizedX = (relativeX / rect.width) * 2 - 1
      mouseX.set(normalizedX * 80)
    }
    container.addEventListener("mousemove", handleMouseMove)
    return () => container.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX])

  const scatterPositions = useMemo(() => {
    return IMAGES.map(() => ({
      x: (Math.random() - 0.5) * 1500,
      y: (Math.random() - 0.5) * 1000,
      rotation: (Math.random() - 0.5) * 180,
      scale: 0.6,
      opacity: 0,
    }))
  }, [])

  const [morphValue, setMorphValue] = useState(0)
  const [rotateValue, setRotateValue] = useState(0)
  const [parallaxValue, setParallaxValue] = useState(0)

  useEffect(() => {
    const u3 = smoothMorph.on("change", setMorphValue)
    const u4 = smoothScrollRotate.on("change", setRotateValue)
    const u5 = smoothMouseX.on("change", setParallaxValue)
    return () => { u3(); u4(); u5() }
  }, [smoothMorph, smoothScrollRotate, smoothMouseX])

  const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1])
  const contentY = useTransform(smoothMorph, [0.8, 1], [20, 0])

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: "#f5f0e1",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Intro Text */}
        <div
          style={{
            position: "absolute",
            zIndex: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            pointerEvents: "none",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={
              introPhase === "circle" && morphValue < 0.5
                ? { opacity: 1 - morphValue * 2, y: 0, filter: "blur(0px)" }
                : { opacity: 0, filter: "blur(10px)" }
            }
            transition={{ duration: 1 }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              color: "#3a3a2a",
              margin: 0,
            }}
          >
            L'art du matcha, réinventé.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={
              introPhase === "circle" && morphValue < 0.5
                ? { opacity: 0.5 - morphValue }
                : { opacity: 0 }
            }
            transition={{ duration: 1, delay: 0.2 }}
            style={{
              marginTop: "1rem",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "#6b7a3a",
            }}
          >
            SCROLL POUR EXPLORER
          </motion.p>
        </div>

        {/* Arc Active Content */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="absolute top-[10%] z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4"
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.5rem, 4vw, 3rem)",
              fontWeight: 500,
              color: "#3a3a2a",
              letterSpacing: "-0.02em",
              marginBottom: "1rem",
            }}
          >
            Notre Univers Matcha
          </h2>
          <p
            style={{
              fontSize: "clamp(0.85rem, 1.5vw, 1rem)",
              color: "#6b5e4e",
              maxWidth: "32ch",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Découvrez un monde où tradition japonaise rencontre créativité
            artisanale. Chaque boisson est une célébration du matcha ceremonial.
          </p>
        </motion.div>

        {/* Main Container */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          {IMAGES.slice(0, TOTAL_IMAGES).map((src, i) => {
            let target

            const scatter = scatterPositions[i]

            const lineSpacing = 70
            const lineTotalWidth = TOTAL_IMAGES * lineSpacing
            const lineX = i * lineSpacing - lineTotalWidth / 2
            const lineTarget = { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1 }

            const minDim = Math.min(containerSize.width || 800, containerSize.height || 600)
            const circleRadius = Math.min(minDim * 0.35, 350)
            const circleAngle = (i / TOTAL_IMAGES) * 360
            const circleRad = (circleAngle * Math.PI) / 180
            const circleTarget = {
              x: Math.cos(circleRad) * circleRadius,
              y: Math.sin(circleRad) * circleRadius,
              rotation: circleAngle + 90,
              scale: 1,
              opacity: 1,
            }

            const isMobile = (containerSize.width || 800) < 768
            const baseRadius = Math.min(containerSize.width || 800, (containerSize.height || 600) * 1.5)
            const arcRadius = baseRadius * (isMobile ? 1.4 : 1.1)
            const arcApexY = (containerSize.height || 600) * (isMobile ? 0.35 : 0.25)
            const arcCenterY = arcApexY + arcRadius
            const spreadAngle = isMobile ? 100 : 130
            const startAngle = -90 - spreadAngle / 2
            const step = spreadAngle / (TOTAL_IMAGES - 1)
            const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1)
            const maxRotation = spreadAngle * 0.8
            const boundedRotation = -scrollProgress * maxRotation
            const currentArcAngle = startAngle + i * step + boundedRotation
            const arcRad = (currentArcAngle * Math.PI) / 180

            const arcTarget = {
              x: Math.cos(arcRad) * arcRadius + parallaxValue,
              y: Math.sin(arcRad) * arcRadius + arcCenterY,
              rotation: currentArcAngle + 90,
              scale: isMobile ? 1.4 : 1.8,
              opacity: 1,
            }

            if (introPhase === "scatter") {
              target = scatter
            } else if (introPhase === "line") {
              target = lineTarget
            } else {
              target = {
                x: lerp(circleTarget.x, arcTarget.x, morphValue),
                y: lerp(circleTarget.y, arcTarget.y, morphValue),
                rotation: lerp(circleTarget.rotation, arcTarget.rotation, morphValue),
                scale: lerp(1, arcTarget.scale, morphValue),
                opacity: 1,
              }
            }

            return (
              <FlipCard
                key={i}
                src={src}
                index={i}
                total={TOTAL_IMAGES}
                phase={introPhase}
                target={target}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

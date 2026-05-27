import { useEffect, useRef, createContext, useContext } from 'react'
import Lenis from 'lenis'

export const LenisContext = createContext(null)

export function useLenis() {
  return useContext(LenisContext)
}

const easeExp = t => Math.min(1, 1.001 - Math.pow(2, -10 * t))

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: true,
      anchors: true,
    })

    lenisRef.current = lenis

    const snapToNearest = () => {
      const sections = Array.from(document.querySelectorAll('section:not(#qualifications)'))
      if (!sections.length) return

      const target = lenis.targetScroll
      const threshold = window.innerHeight * 0.45

      let nearest = sections[0]
      let minDist = Infinity

      for (const section of sections) {
        const dist = Math.abs(section.offsetTop - target)
        if (dist < minDist) {
          minDist = dist
          nearest = section
        }
      }

      if (minDist <= threshold) {
        lenis.scrollTo(nearest.offsetTop, { duration: 1.2, easing: easeExp })
      }
    }

    let snapTimer
    const onWheel = () => { clearTimeout(snapTimer); snapTimer = setTimeout(snapToNearest, 150) }
    const onTouchEnd = () => { clearTimeout(snapTimer); snapTimer = setTimeout(snapToNearest, 300) }

    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      lenisRef.current = null
      cancelAnimationFrame(rafId)
      clearTimeout(snapTimer)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchend', onTouchEnd)
      lenis.destroy()
    }
  }, [])

  return (
    <LenisContext.Provider value={lenisRef}>
      {children}
    </LenisContext.Provider>
  )
}

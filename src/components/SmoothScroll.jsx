import { useEffect, useRef, createContext, useContext } from 'react'
import Lenis from 'lenis'

export const LenisContext = createContext(null)

export function useLenis() {
  return useContext(LenisContext)
}

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

    const ease = t => Math.min(1, 1.001 - Math.pow(2, -10 * t))

    const snapToNearest = () => {
      const sections = Array.from(document.querySelectorAll('section:not(#qualifications)'))
      if (!sections.length) return

      const target = lenis.targetScroll
      let nearest = sections[0]
      let minDist = Infinity

      for (const section of sections) {
        const dist = Math.abs(section.offsetTop - target)
        if (dist < minDist) {
          minDist = dist
          nearest = section
        }
      }

      lenis.scrollTo(nearest.offsetTop, { duration: 1.2, easing: ease })
    }

    let snapTimer
    const scheduleSnap = (delay) => {
      clearTimeout(snapTimer)
      snapTimer = setTimeout(snapToNearest, delay)
    }

    const onWheel = () => scheduleSnap(150)
    const onTouchEnd = () => scheduleSnap(300)

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

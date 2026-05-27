import { useEffect } from 'react'
import Lenis from 'lenis'
import Snap from 'lenis/snap'

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: true,
      anchors: true,
    })

    const snap = new Snap(lenis, {
      type: 'mandatory',
      debounce: 300,
    })

    const sections = Array.from(document.querySelectorAll('section:not(#qualifications)'))
    const removeSnaps = sections.map(section => snap.addElement(section))

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      removeSnaps.forEach(remove => remove())
      snap.destroy()
      lenis.destroy()
    }
  }, [])

  return children
}

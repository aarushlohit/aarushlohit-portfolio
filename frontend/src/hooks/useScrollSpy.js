import { useEffect, useState } from 'react'

/**
 * Highlights the section whose top has passed the scroll line (viewport offset from top).
 */
export function useScrollSpy(sectionIds, offset = 120) {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const onScroll = () => {
      const line = window.scrollY + offset
      let current = ''
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top + window.scrollY
        if (top <= line) current = id
      }
      setActiveId(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [sectionIds, offset])

  return activeId
}

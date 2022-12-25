import { useRef, useEffect, useState, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import styles from "../styles/Overlay.module.css"

interface PortalProps {
  isOpen: any,
  children: ReactNode,
}

export const Portal = (props: PortalProps) => {
  
  const ref = useRef<Element | null>(null)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>("#portal")
    setMounted(true)
  }, [])

  return (mounted && ref.current) ? createPortal(
    <div className={styles.overlay}>
      <div className={styles.content}>
        <button onClick={()=> props.isOpen}>close</button>
        {props.children}
      </div> 
    </div>, ref.current) : null
}

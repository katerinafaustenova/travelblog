// import { useRef, useEffect, useState, ReactNode } from 'react'
// import { createPortal } from 'react-dom'
// import styles from "../styles/Overlay.module.css"

// interface OverlayProps {
//   closeHandler: VoidFunction,
//   children: ReactNode,
// }

// export const Overlay = (props: OverlayProps) => {
//   const { children, closeHandler } = props

//   const node = useRef<Element | null>(null)

//   const handleOutsideClick = e => {
//     if (node.current.contains(e.target)) {
//       console.log('klikam inside')
//       return;
//     }
//     return console.log("klikam outside")
//   };

//   useEffect(() => {
//       // const outsideEl = document.querySelector<HTMLElement>("#content")
//       // console.log('outsideEl',outsideEl)
//       // add when mounted
//       document.addEventListener("mousedown", handleOutsideClick);
//       return () => {
//         // return function to be called when unmounted
//         document.removeEventListener("mousedown", handleOutsideClick);
//       }
//   }, [])

  
//   return (
//     <div className={styles.overlay}>
//       <div className={styles.content} ref={node}>
//         {children}
//       </div> 
//     </div>
//   )
// }

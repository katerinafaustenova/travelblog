import Image from "next/image";
import { useState, ReactNode } from 'react'
import styles from "../styles/Gallery.module.css"

interface ImagesProps {
  id: string,
  title: string,
  fileName: string,
  url: string
}

interface GalleryProps {
  images: Array<ImagesProps>,
  chosenId: string,
  children: ReactNode,
}

export const Gallery = ({images, chosenId, children}: GalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(images?.findIndex((img): any => (img.id === chosenId)));
  
  const firstPosition = activeIndex === 0
  const lastPosition = activeIndex + 1 === images.length

  return (
    <div className={styles.gallery}>
      {!firstPosition ?
        <button className={styles.left} onClick={() => setActiveIndex(activeIndex - 1)}>
          {'<'}
        </button> : null}
      {images[activeIndex] &&
        <Image
          src={images[activeIndex].url}
          alt={images[activeIndex].title || images[activeIndex].fileName}
          fill
          priority
          sizes="100vw"
        />
      }
      {children}
      {!lastPosition ?
        <button className={styles.right} onClick={() => setActiveIndex(activeIndex + 1)}>
          {'>'}
        </button> : null}
    </div>
  )
}

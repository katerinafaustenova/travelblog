import Image from "next/image";
import { useRef, useEffect, useState, ReactNode } from 'react'
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

export const Gallery = (props: GalleryProps) => {
  const { images,chosenId, children } = props
  
  console.log('chosenId', chosenId, images)
  const activeImage = images?.find((img): any => img.id === chosenId)

  return (
    <div className={styles.gallery}>
        {activeImage &&
          <Image
            src={activeImage.url}
            alt={activeImage.title || activeImage.fileName}
            fill
            sizes="100vw"
          />
        }
        {children}
    </div>)
}

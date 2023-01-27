import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Gallery.module.css";

interface ImagesProps {
  id: string;
  title: string;
  fileName: string;
  url: string;
}

interface GalleryProps {
  images: Array<ImagesProps>;
  chosenId: string;
}

export const Gallery = ({ images, chosenId }: GalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(
    images?.findIndex((img): any => img.id === chosenId)
  );

  const firstPosition = activeIndex === 0;
  const lastPosition = activeIndex + 1 === images.length;

  const handleKeyDown = (e: any) => {
    if (e.keyCode === 37 && !firstPosition) {
      setActiveIndex(activeIndex - 1);
    }
    if (e.keyCode === 39 && !lastPosition) {
      setActiveIndex(activeIndex + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <div className={styles.gallery}>
      {!firstPosition ? (
        <button
          className={styles.left}
          onClick={() => setActiveIndex(activeIndex - 1)}
        >
          {"<"}
        </button>
      ) : null}
      {images[activeIndex] && (
        <Image
          src={images[activeIndex].url}
          alt={images[activeIndex].title || images[activeIndex].fileName}
          fill
          priority
          sizes="100vw"
        />
      )}
      {!lastPosition ? (
        <button
          className={styles.right}
          onClick={() => setActiveIndex(activeIndex + 1)}
        >
          {">"}
        </button>
      ) : null}
    </div>
  );
};

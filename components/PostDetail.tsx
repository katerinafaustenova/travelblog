import { format } from "date-fns";
import Image from "next/image";
import { useContext, useState } from "react";
import LangContext from "../context/LangContext";
import styles from "../styles/PostDetail.module.css";
import { getCzechCountryName } from "../utils/getCzechCountryName";
import { getEscapedText } from "../utils/getEscapedText";
import { processNbsp } from "../utils/processNbsp";
import { Gallery } from "./Gallery";
import { Portal } from "./Portal";
import { PostContentWithImages } from "./PostContentWithImages";
import { PostItineraryItem } from "./PostItineraryItem";

export function PostDetail({ post, imagesJsonData }: any) {
  const { enLang } = useContext(LangContext);
  const [modalState, setModalState] = useState({ open: false, chosenId: "" });

  if (!post) return null;

  const {
    date,
    country,
    region,
    title,
    titleEn,
    description,
    descriptionEn,
    image,
    contentWithImages,
    map,
    itinerary_item_ref,
  } = post;

  const countryName = enLang
    ? getEscapedText(country, "_")
    : getCzechCountryName(getEscapedText(country, "_"));
  const regionName = getEscapedText(region, "_");
  const newTitle = enLang && titleEn ? titleEn : title;
  const newDescription = enLang && descriptionEn ? descriptionEn : description;
  const processedDescription = processNbsp(newDescription) || newDescription;

  const allHygraphImages = contentWithImages
    ?.map(({ images }: any) => images)
    ?.flat();
  const allImages =
    imagesJsonData?.length > 1
      ? [...allHygraphImages, ...imagesJsonData]
      : allHygraphImages;
  allImages.unshift(image);

  return (
    <>
      <div className={styles.info}>
        <span className={styles.category}>
          {`${countryName} - ${regionName}`}
        </span>
        <time className={styles.date}>
          {format(new Date(date), "dd.MM.yyyy")}
        </time>
      </div>
      <h2 className={styles.title}>{newTitle}</h2>
      <p
        className={styles.perex}
        dangerouslySetInnerHTML={{
          __html: processedDescription,
        }}
      />
      <div className={styles.imageWrapper}>
        <Image
          src={image.url}
          alt={image.title || image.fileName}
          onClick={() => setModalState({ open: true, chosenId: image.id })}
          fill
          sizes="(max-width: 900px) 100vw, 70vw"
          priority
        />
      </div>
      <PostContentWithImages
        contentWithImages={contentWithImages}
        imagesJsonData={imagesJsonData}
        setModalState={setModalState}
      />
      {map ? (
        <div
          className={styles.mapContainer}
          dangerouslySetInnerHTML={{ __html: map }}
        />
      ) : null}
      <PostItineraryItem itinerary_item_ref={itinerary_item_ref} />
      {modalState?.open && allImages ? (
        <Portal
          closeHandler={() => setModalState({ ...modalState, open: false })}
        >
          <Gallery images={allImages} chosenId={modalState?.chosenId}></Gallery>
        </Portal>
      ) : null}
    </>
  );
}

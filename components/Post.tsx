import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Post.module.css";
import { getCzechCountryName } from "../utils/getCzechCountryName";
import { getEscapedText } from "../utils/getEscapedText";

export default function Post({ post }: any) {
  if (!post) return null;

  const { slug, date, title, description, image, country, region } = post;

  return (
    <div className={styles.post}>
      <Link href={slug} className={styles.link}>
        <div className={styles.imageWrapper}>
          <Image
            src={image.url}
            alt={image.title || image.fileName}
            fill
            sizes="(max-width: 600px) 100vw,
              (max-width: 800px) 50vw,
              33vw"
            className={styles.image}
          />
        </div>
        <div className={styles.content}>
          <time className={styles.date}>
            {format(new Date(date), "dd.MM.yyyy")}
          </time>
          <div className={styles.location}>
            <span className={styles.country}>
              {getCzechCountryName(getEscapedText(country, "_"))}
            </span>
            <span className={styles.region}>{getEscapedText(region, "_")}</span>
          </div>
          <h2 className={styles.title}>{title}</h2>
          <p
            className={styles.perex}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </Link>
    </div>
  );
}

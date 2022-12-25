import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Post.module.css";

export default function Post({ post }: any) {
  if (!post) return null;

  const { slug, date, title, description, image, region } = post;
  const escapedRegion = region.replaceAll("_", " "); // todo vyseparovat bokem, je pouzito dvakrat
  return (
    <div className={styles.post}>
      <Link href={slug} className={styles.link}>
        <div className={styles.imageWrapper}>
          <Image
            src={image.url}
            alt={image.title || image.fileName}
            fill
            objectFit="cover"
            sizes="(max-width: 600px) 100vw,
              (max-width: 800px) 50vw,
              33vw"
            className={styles.image}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.categoryDate}>
            <div className={styles.location}>{escapedRegion}</div>
            <time className={styles.date}>
              {format(new Date(date), "dd.MM.yyyy")}
            </time>
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

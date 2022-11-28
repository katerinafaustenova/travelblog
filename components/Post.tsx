import { format } from "date-fns";
import Link from "next/link";
import styles from "../styles/Post.module.css";

export default function Post({ post }: any) {
  if (!post) return null;

  const { title, slug, date, description, image, category } = post;

  return (
    <div className={styles.post}>
      <Link href={slug} className={styles.link}>
        <img src={image?.url} alt={image?.fileName} className={styles.image} />
        <div className={styles.content}>
          <div className={styles.categoryDate}>
            {/* <span className={styles.category}>{category}</span> */}
            <time className={styles.date}>
              {format(new Date(date), "dd.MM.yyyy")}
            </time>
          </div>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.perex}>{description}</p>
        </div>
      </Link>
    </div>
  );
}

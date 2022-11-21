import { format } from "date-fns";
import { Link } from "react-router-dom";
import styles from "./Posts.module.css";

function Posts({ posts }) {
  if (!posts) return;
  document?.querySelectorAll("p:empty").forEach((x) => {
    x.remove();
  });
  return (
    <>
      {posts?.map(({ id, image, title, slug, date, content }) => {
        return (
          <Link key={id} to={slug} className={styles.post}>
            <img
              src={image?.url}
              alt={image?.fileName}
              className={styles.image}
            />
            <div className={styles.content}>
              <time className={styles.date}>
                {format(new Date(date), "dd.MM.yyyy")}
              </time>
              <h2 className={styles.title}>{title}</h2>
              <div
                dangerouslySetInnerHTML={{ __html: content?.html }}
                className={styles.wysiwyg}
              />
            </div>
          </Link>
        );
      })}
    </>
  );
}

export default Posts;

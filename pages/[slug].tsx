import { format } from "date-fns";
import { gql, GraphQLClient } from "graphql-request";
import { useEffect } from "react";
import Base from "../components/Base";
import styles from "../styles/Slug.module.css";

const endpoint = new GraphQLClient(
  "https://api-eu-west-2.hygraph.com/v2/claqvecol6m0o01t7fp787wjw/master"
);

const query = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
      createdAt
      date
      id
      slug
      title
      updatedAt
      content {
        html
      }
      image {
        url
        fileName
      }
      category
      description
      map
      itinerary
      gallery {
        fileName
        url
      }
    }
  }
`;

const sluglistQuery = gql`
  {
    posts {
      slug
    }
  }
`;

export async function getStaticPaths() {
  const { posts } = await endpoint.request(sluglistQuery);
  return {
    paths: posts.map((post: { slug: any }): any => ({
      params: { slug: post.slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const slug = params.slug;
  const { post } = await endpoint.request(query, { slug });
  return {
    props: {
      post,
    },
    revalidate: 100,
  };
}

export default function PostDetail({ post }: any) {
  useEffect(() => {
    if (typeof window !== undefined) {
      document?.querySelectorAll("p:empty").forEach((x) => {
        x.remove();
      });
    }
  }, []);

  if (!post) return null;

  const {
    title,
    date,
    content,
    image,
    description,
    category,
    map,
    itinerary,
    gallery,
  } = post;

  console.log("gallery", gallery);

  return (
    <Base>
      <main className={styles.main}>
        <img src={image?.url} alt={image?.fileName} className={styles.image} />
        <div className={styles.content}>
          <div className={styles.categoryDate}>
            <span className={styles.category}>{category}</span>
            <time className={styles.date}>
              {format(new Date(date), "dd.MM.yyyy")}
            </time>
          </div>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.perex}>{description}</p>
          <div
            dangerouslySetInnerHTML={{ __html: content?.html }}
            className={styles.wysiwyg}
          />
          {map && (
            <div
              className={styles.mapContainer}
              dangerouslySetInnerHTML={{ __html: map }}
            />
          )}
          {itinerary?.data && (
            <>
              <h3 className={styles.itineraryTitle}>Itinerář:</h3>
              {itinerary.data.map(({ date, text, title }: any, idx: number) => (
                <>
                  <div className={styles.itineraryItem}>
                    <div className={styles.itineraryHeader}>
                      <time className={styles.itineraryDate}>{date}</time>
                      <h4 className={styles.itineraryName}>{title}</h4>
                    </div>
                    <div className={styles.itineraryContent}>
                      <p className={styles.itineraryText}>{text}</p>
                    </div>
                  </div>
                </>
              ))}
            </>
          )}
        </div>
      </main>
    </Base>
  );
}

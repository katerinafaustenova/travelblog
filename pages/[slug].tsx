import { format } from "date-fns";
import { gql, GraphQLClient } from "graphql-request";
import Image from "next/image";
import React, { useEffect } from "react";
import Base from "../components/Base";
import styles from "../styles/Slug.module.css";

const endpoint = new GraphQLClient(
  "https://api-eu-west-2.hygraph.com/v2/claqvecol6m0o01t7fp787wjw/master"
);

const query = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
      id
      date
      slug
      category
      title
      description
      image {
        url
        title
        fileName
      }
      content {
        html
      }
      map
      itinerary_item_ref {
        ... on Itinerary_item_for_post {
          id
          date
          title
          text
        }
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
    date,
    category,
    title,
    description,
    image,
    content,
    map,
    itinerary_item_ref,
  } = post;

  const processedHtml = content?.html?.replaceAll("amp;", "");

  return (
    <Base>
      <section className={styles.content}>
        <div className={styles.info}>
          <span className={styles.category}>{category}</span>
          <time className={styles.date}>
            {format(new Date(date), "dd.MM.yyyy")}
          </time>
        </div>
        <h2 className={styles.title}>{title}</h2>
        <p
          className={styles.perex}
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <div className={styles.imageWrapper}>
          <Image
            src={image.url}
            alt={image.title || image.fileName}
            fill
            objectFit="cover"
            sizes="(max-width: 900px) 100vw, 70vw"
          />
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: processedHtml }}
          className={styles.wysiwyg}
        />
        {map && (
          <div
            className={styles.mapContainer}
            dangerouslySetInnerHTML={{ __html: map }}
          />
        )}
        {itinerary_item_ref && (
          <>
            <h3 className={styles.itineraryTitle}>Itinerář:</h3>
            {itinerary_item_ref.map(({ id, title, date, text }: any) => {
              return (
                <React.Fragment key={id}>
                  <div className={styles.itineraryItem}>
                    <div className={styles.itineraryHeader}>
                      <time className={styles.itineraryDate}>
                        {format(new Date(date), "dd.MM")}
                      </time>
                      <h5 className={styles.itineraryName}>{title}</h5>
                    </div>
                    <div className={styles.itineraryContent}>
                      {text && (
                        <p
                          className={styles.itineraryText}
                          dangerouslySetInnerHTML={{ __html: text }}
                        />
                      )}
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </>
        )}
      </section>
    </Base>
  );
}

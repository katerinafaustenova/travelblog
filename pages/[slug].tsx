import { format } from "date-fns";
import { gql, GraphQLClient } from "graphql-request";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Base from "../components/Base";
import { Gallery } from "../components/Gallery";
import { Portal } from "../components/Portal";
import styles from "../styles/Slug.module.css";
import { getCzechCountryName } from "../utils/getCzechCountryName";
import { getEscapedText } from "../utils/getEscapedText";

const endpoint = new GraphQLClient(
  "https://api-eu-west-2.hygraph.com/v2/claqvecol6m0o01t7fp787wjw/master"
);

const query = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
      id
      date
      slug
      country
      region
      title
      description
      image {
        id
        url
        title
        fileName
        width
        height
      }
      contentWithImages {
        ... on ContentWithImages {
          id
          content {
            html
          }
          images(first: 100) {
            id
            url
            title
            fileName
            width
            height
          }
        }
      }
      map
      itinerary_item_ref(first: 100) {
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
      title
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
  // TODO refaktor queries, nemusim tahat jeden post z query, kdyz uz tu mam natazene vsechny
  const { posts } = await endpoint.request(sluglistQuery);
  const sluglist = posts.map((post: any) => {
    return { slug: post.slug, title: post.title };
  });
  return {
    props: {
      post,
      sluglist,
    },
    revalidate: 100,
  };
}

export default function PostDetail({ post, sluglist }: any) {
  const [modalState, setModalState] = useState({ open: false, chosenId: "" });

  useEffect(() => {
    if (typeof window !== undefined) {
      document?.querySelectorAll("p:empty").forEach((x) => {
        x.remove();
      });
    }
  }, [post.slug]);

  if (!post) return null;

  const {
    date,
    country,
    region,
    title,
    description,
    image,
    contentWithImages,
    map,
    itinerary_item_ref,
    slug,
  } = post;

  const slugIndex = sluglist.findIndex(
    (slugItem: any) => slugItem.slug === slug
  );
  const prevPost = sluglist[slugIndex - 1];
  const nextPost = sluglist[slugIndex + 1];
  const showNextPost = sluglist[slugIndex + 2];

  const allImages = contentWithImages?.map(({ images }: any) => images)?.flat();
  allImages.unshift(image);

  return (
    <Base>
      <section className={styles.content}>
        {prevPost && (
          <div className={styles.previousPost}>
            <h3>
              Předchozí článek:&nbsp;
              <Link href={prevPost.slug} className={styles.link}>
                {prevPost.title}
              </Link>
            </h3>
          </div>
        )}
        <div className={styles.info}>
          <span className={styles.category}>
            {`${getCzechCountryName(
              getEscapedText(country, "_")
            )} - ${getEscapedText(region, "_")}`}
          </span>
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
            onClick={() => setModalState({ open: true, chosenId: image.id })}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 70vw"
          />
        </div>
        {contentWithImages?.length > 0 &&
          contentWithImages.map(({ content, images }: any) => {
            const escapedContent = content?.html?.replaceAll("amp;", "");
            return (
              <>
                {escapedContent && (
                  <div
                    dangerouslySetInnerHTML={{ __html: escapedContent }}
                    className={styles.wysiwyg}
                  />
                )}
                {images?.length > 0 && (
                  <div className={styles.wysiwygImages}>
                    {images.map(
                      ({ id, url, title, fileName, width, height }: any) => {
                        const paddingRatio = (height / width) * 100;
                        return (
                          <div key={id} className={styles.wysiwygImageFlex}>
                            <div
                              className={styles.wysiwygImageWrapper}
                              style={{ paddingBottom: `${paddingRatio}%` }}
                            >
                              <Image
                                src={url}
                                alt={title || fileName}
                                onClick={() =>
                                  setModalState({ open: true, chosenId: id })
                                }
                                fill
                                sizes="(max-width: 700px) 100vw, 50vw"
                              />
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                )}
              </>
            );
          })}
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
                <div key={id} className={styles.itineraryItem}>
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
              );
            })}
          </>
        )}
        {nextPost && showNextPost && (
          <div className={styles.nextPost}>
            <h3>
              Následující článek:&nbsp;
              <Link href={nextPost.slug} className={styles.link}>
                {nextPost.title}
              </Link>
            </h3>
          </div>
        )}
      </section>
      {modalState?.open ? (
        <Portal
          closeHandler={() => setModalState({ ...modalState, open: false })}
        >
          <Gallery images={allImages} chosenId={modalState?.chosenId}></Gallery>
        </Portal>
      ) : null}
    </Base>
  );
}

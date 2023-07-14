import { gql } from "graphql-request";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { endpoint } from ".";
import { Base } from "../components/Base";
import { PostDetail } from "../components/PostDetail";
import { ScrollTop } from "../components/ScrollTop";
import LangContext from "../context/LangContext";
import styles from "../styles/Slug.module.css";

const query = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
      id
      date
      slug
      country
      region
      title
      titleEn
      description
      descriptionEn
      visible
      image {
        id
        url
        title
        titleEn
        fileName
        width
        height
      }
      contentWithImages(first: 100) {
        ... on ContentWithImages {
          id
          content {
            html
          }
          contentEn {
            html
          }
          images(first: 100) {
            id
            url
            title
            titleEn
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
    posts(first: 100) {
      slug
      title
      titleEn
      visible
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
  let currentPost;
  let sluglist;
  let imagesJsonData;

  const slug = params.slug;

  try {
    const { post } = await endpoint.request(query, { slug });
    currentPost = post;
  } catch (error) {
    console.error("Error fetching data for current post:", error);
    currentPost = null;
  }

  try {
    const { posts } = await endpoint.request(sluglistQuery);
    sluglist = posts;
  } catch (error) {
    console.error("Error fetching data for previous and next post:", error);
    sluglist = null;
  }

  try {
    const imagesJsonResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_PATH}/${slug}/images.json`
    );
    imagesJsonData = await imagesJsonResponse.json();
  } catch (error) {
    console.error("Error fetching data for imagesJsonData:", error);
    imagesJsonData = null;
  }

  const props = {
    post: currentPost,
    sluglist,
    imagesJsonData,
  };

  return {
    props,
    revalidate: 100,
  };
}

export default function PostItem({ post, sluglist, imagesJsonData }: any) {
  const { enLang } = useContext(LangContext);

  useEffect(() => {
    if (typeof window !== undefined) {
      document?.querySelectorAll("p:empty").forEach((x) => {
        x.remove();
      });
    }
  }, [post.slug]);

  if (!post || post === null) return null;

  const { slug, title, titleEn } = post;
  const visibleSluglist = sluglist.filter((item: any) => item.visible);
  const slugIndex = visibleSluglist?.findIndex(
    (slugItem: any) => slugItem.slug === slug
  );
  const prevPost =
    slugIndex === -1 ? undefined : visibleSluglist[slugIndex - 1];
  const nextPost =
    slugIndex === -1 ? undefined : visibleSluglist[slugIndex + 1];
  const newTitle = enLang && titleEn ? titleEn : title;

  return (
    <Base title={newTitle}>
      <section className={styles.content}>
        <div className={styles.previousPost}>
          {prevPost && prevPost?.visible ? (
            <h3>
              {enLang ? "Previous article" : "Předchozí článek"}:&nbsp;
              <Link href={prevPost.slug} className={styles.link}>
                {enLang && prevPost.titleEn ? prevPost.titleEn : prevPost.title}
              </Link>
            </h3>
          ) : null}
        </div>
        <PostDetail post={post} imagesJsonData={imagesJsonData} />
        <div className={styles.nextPost}>
          {nextPost && nextPost?.visible ? (
            <h3>
              {enLang ? "Next article" : "Následující článek"}:&nbsp;
              <Link href={nextPost.slug} className={styles.link}>
                {enLang && nextPost.titleEn ? nextPost.titleEn : nextPost.title}
              </Link>
            </h3>
          ) : null}
          <ScrollTop />
        </div>
      </section>
    </Base>
  );
}

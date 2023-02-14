import { gql, GraphQLClient } from "graphql-request";
import Link from "next/link";
import { useEffect } from "react";
import Base from "../components/Base";
import PostDetail from "../components/PostDetail";
import ScrollTop from "../components/ScrollTop";
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
      contentWithImages(first: 100) {
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
    posts(first: 100) {
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

export default function PostItem({ post, sluglist }: any) {
  useEffect(() => {
    if (typeof window !== undefined) {
      document?.querySelectorAll("p:empty").forEach((x) => {
        x.remove();
      });
    }
  }, [post.slug]);

  if (!post) return null;

  const { slug } = post;

  const slugIndex = sluglist.findIndex(
    (slugItem: any) => slugItem.slug === slug
  );
  const prevPost = sluglist[slugIndex - 1];
  const nextPost = sluglist[slugIndex + 1];
  const showNextPost = sluglist[slugIndex + 2];

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
        <PostDetail post={post} />
        <div className={styles.nextPost}>
          {nextPost && showNextPost && (
            <h3>
              Následující článek:&nbsp;
              <Link href={nextPost.slug} className={styles.link}>
                {nextPost.title}
              </Link>
            </h3>
          )}
          <ScrollTop />
        </div>
      </section>
    </Base>
  );
}

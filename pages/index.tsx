import { gql, GraphQLClient } from "graphql-request";
import React from "react";
import Base from "../components/Base";
import Post from "../components/Post";
import styles from "../styles/Home.module.css";

const endpoint = new GraphQLClient(
  "https://api-eu-west-2.hygraph.com/v2/claqvecol6m0o01t7fp787wjw/master"
);

const query = gql`
  {
    posts(orderBy: date_ASC) {
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
    }
  }
`;

export async function getStaticProps() {
  const { posts } = await endpoint.request(query);
  return {
    props: {
      posts,
    },
    revalidate: 100,
  };
}

export default function Home({ posts }: any) {
  if (!posts) return null;

  const allCategories = posts.map(({ category }: any) => category);
  const uniqueCategories = Array.from(new Set(allCategories));

  return (
    <Base>
      <section className={styles.content}>
        {uniqueCategories.map((category: any, idx) => {
          const escapedCategory = category.replaceAll("_", " ");
          return (
            <React.Fragment key={idx}>
              <h2 className={styles.sectionTitle}>{escapedCategory}</h2>
              <div className={styles.posts}>
                {posts
                  .filter((post: any) => post.category === category)
                  .map((post: any, idx: number) => {
                    return <Post post={post} key={idx} />;
                  })}
              </div>
            </React.Fragment>
          );
        })}
      </section>
    </Base>
  );
}

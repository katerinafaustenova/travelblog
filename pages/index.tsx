import { gql, GraphQLClient } from "graphql-request";
import { useState } from "react";
import { Base } from "../components/Base";
import { MultiSelect } from "../components/MultiSelect";
import { Post } from "../components/Post";
import styles from "../styles/Home.module.css";
import { isPostNewest } from "../utils/isPostNewest";

export const endpoint = new GraphQLClient(
  "https://api-eu-west-2.hygraph.com/v2/claqvecol6m0o01t7fp787wjw/master"
);

const query = gql`
  {
    posts(orderBy: date_DESC, first: 100) {
      id
      date
      slug
      country
      region
      title
      titleEn
      description
      descriptionEn
      image {
        url
        title
        titleEn
        fileName
      }
      visible
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
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);

  if (!posts) return null;

  const visiblePosts = posts?.filter((post: any) => post.visible);

  const filteredPosts =
    selectedOptions.length === 0
      ? posts
      : posts.filter(({ country }: any) => {
          const array = selectedOptions.map(({ value }) => value);
          return array.includes(country);
        });

  return (
    <Base>
      <section className={styles.content}>
        <MultiSelect posts={posts} setSelectedOptions={setSelectedOptions} />
        <div className={styles.posts}>
          {filteredPosts.map((post: any, idx: number) => {
            return (
              <Post
                key={idx}
                post={post}
                isNew={isPostNewest(visiblePosts, post.id, post.date)}
              />
            );
          })}
        </div>
      </section>
    </Base>
  );
}

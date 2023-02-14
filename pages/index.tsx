import { gql, GraphQLClient } from "graphql-request";
import { useState } from "react";
import Base from "../components/Base";
import MultiSelect from "../components/MultiSelect";
import Post from "../components/Post";
import styles from "../styles/Home.module.css";

const endpoint = new GraphQLClient(
  "https://api-eu-west-2.hygraph.com/v2/claqvecol6m0o01t7fp787wjw/master"
);

const query = gql`
  {
    posts(orderBy: date_ASC, first: 100) {
      id
      date
      slug
      country
      region
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
  // zobrazuje o jeden post méně (ten poslední se nezobrazí)
  const showedPosts = posts.slice(0, posts.length - 1);
  return {
    props: {
      showedPosts,
    },
    revalidate: 100,
  };
}

export default function Home({ showedPosts }: any) {
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);

  if (!showedPosts) return null;

  const filteredPosts =
    selectedOptions.length === 0
      ? showedPosts
      : showedPosts.filter(({ country }: any) => {
          const array = selectedOptions.map(({ value }) => value);
          return array.includes(country);
        });

  return (
    <Base>
      <section className={styles.content}>
        <MultiSelect
          posts={showedPosts}
          setSelectedOptions={setSelectedOptions}
        />
        <div className={styles.posts}>
          {filteredPosts.map((post: any, idx: number) => {
            return <Post post={post} key={idx} />;
          })}
        </div>
      </section>
    </Base>
  );
}

{
  /* {uniqueCategories.map((category: any, idx) => {
  const escapedCategory = category.replaceAll("_", " ");
  return (
    <React.Fragment key={idx}>
      <h2 className={styles.sectionTitle}>{escapedCategory}</h2>
      <div className={styles.posts}>
        {newPosts
          .filter((post: any) => post.category === category)
          .map((post: any, idx: number) => {
            return <Post post={post} key={idx} />;
          })}
      </div>
    </React.Fragment>
  );
})}*/
}

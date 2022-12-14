import { gql, GraphQLClient } from "graphql-request";
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
  return {
    props: {
      posts,
    },
    revalidate: 100,
  };
}

export default function Home({ posts }: any) {
  if (!posts) return null;

  const newPosts = posts.slice(0, posts.length - 1);
  // const allCountries = newPosts.map(({ country }: any) => country);
  // const uniqueCountries = Array.from(new Set(allCountries));

  return (
    <Base>
      <section className={styles.content}>
        <div className={styles.posts}>
          {newPosts.map((post: any, idx: number) => {
            return <Post post={post} key={idx} />;
          })}
        </div>
      </section>
    </Base>
  );
}


{/* {uniqueCategories.map((category: any, idx) => {
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
})}*/}

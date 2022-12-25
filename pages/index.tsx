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
  const allRegions = newPosts.map(({ region }: any) => region);
  const uniqueRegions = Array.from(new Set(allRegions));

  return (
    <Base>
      <section className={styles.content}>
        {/* {uniqueRegions.map((region: any, idx) => {
          const escapedRegion = region.replaceAll("_", " ");
          return (
            <React.Fragment key={idx}>
              <h2 className={styles.sectionTitle}>{escapedRegion}</h2>
              <div className={styles.posts}>
                {newPosts
                  .filter((post: any) => post.region === region)
                  .map((post: any, idx: number) => {
                    return <Post post={post} key={idx} />;
                  })}
              </div>
            </React.Fragment>
          );
        })}*/}
        <h2 className={styles.sectionTitle}>Indonésie</h2>
        <div className={styles.posts}>
          {newPosts.map((post: any, idx: number) => {
            return <Post post={post} key={idx} />;
          })}
        </div>
      </section>
    </Base>
  );
}

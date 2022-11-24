import { gql, GraphQLClient } from "graphql-request";
import Base from "../components/Base";
import Post from "../components/Post";
import styles from "../styles/Home.module.css";

const endpoint = new GraphQLClient(
  "https://api-eu-west-2.hygraph.com/v2/claqvecol6m0o01t7fp787wjw/master"
);

const query = gql`
  {
    posts {
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
  return (
    <Base>
      <main className={styles.main}>
        {posts.map((post: any, idx: number) => {
          return <Post post={post} key={idx} />;
        })}
      </main>
    </Base>
  );
}

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
      category
      description
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
      <section className={styles.content}>
      <div className={styles.sectionTitle}>Bali</div>
        {posts.map((post: any, idx: number) => {
          return <Post post={post} key={idx} />;
        })}
      </section>
    </Base>
  );
}

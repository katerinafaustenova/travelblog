import { getYear } from "date-fns";
import { gql, GraphQLClient } from "graphql-request";
import Head from "next/head";
import Header from "../components/Header";
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
    <div className={styles.container}>
      <Head>
        <title>Travel blog</title>
        <meta
          name="description"
          content="This is our travel blog for friend and family"
        />
        <link rel="icon" href="/travel.ico" />
      </Head>

      <Header />

      <main className={styles.main}>
        {posts.map((post: any) => {
          return <Post post={post} />;
        })}
      </main>

      <footer className={styles.footer}>
        © Copyright {getYear(new Date())}. All rights reserved.
      </footer>
    </div>
  );
}

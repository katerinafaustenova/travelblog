import { format } from "date-fns";
import { gql, GraphQLClient } from "graphql-request";
import Base from "../components/Base";
import styles from "../styles/Slug.module.css";

const endpoint = new GraphQLClient(
  "https://api-eu-west-2.hygraph.com/v2/claqvecol6m0o01t7fp787wjw/master"
);

const query = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
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
      map {
        latitude
        longitude
      }
      itinerary
    }
  }
`;

const sluglistQuery = gql`
  {
    posts {
      slug
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
  return {
    props: {
      post,
    },
    revalidate: 100,
  };
}

export default function PostDetail({ post }: any) {
  if (!post) return null;

  const { title, date, content, image, description, category, map, itinerary } =
    post;

  console.log("data", map, itinerary);

  return (
    <Base>
      <main className={styles.main}>
        <img src={image?.url} alt={image?.fileName} className={styles.image} />
        <div className={styles.content}>
          <small>{category}</small>
          <time className={styles.date}>
            {format(new Date(date), "dd.MM.yyyy")}
          </time>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.perex}>{description}</p>
          <div
            dangerouslySetInnerHTML={{ __html: content?.html }}
            className={styles.wysiwyg}
          />
        </div>
      </main>
    </Base>
  );
}

import { gql, request } from "graphql-request";
import { useQuery } from "react-query";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Posts from "./components/Posts/Posts";

const endpoint =
  "https://api-eu-west-2.hygraph.com/v2/claqvecol6m0o01t7fp787wjw/master";
const postQuery = gql`
  {
    posts {
      id
      title
      slug
      date
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

function App() {
  const { data, isLoading, error } = useQuery("posts", () => {
    return request(endpoint, postQuery);
  });
  return (
    <>
      <Header />
      <Navbar />
      <main className="main">
        {data?.posts && !isLoading && !error ? (
          <Posts posts={data?.posts} />
        ) : isLoading ? (
          <p>Načítám...</p>
        ) : error ? (
          <p>Někde se stala chyba, zkuste to prosím později.</p>
        ) : null}
      </main>
    </>
  );
}

export default App;

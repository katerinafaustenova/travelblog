import { gql, request } from "graphql-request";
import { useQuery } from "react-query";
import Header from "./components/Header/Header";

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
    }
  }
`;

function App() {
  const { data, isLoading, error } = useQuery("posts", () => {
    return request(endpoint, postQuery);
  });
  console.log("data", data, "loading", isLoading, "err", error);
  return (
    <>
      <Header />
      {/* <Navbar /> */}
      <main></main>
    </>
  );
}

export default App;

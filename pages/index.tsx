import { gql, GraphQLClient } from "graphql-request";
import { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Base from "../components/Base";
import Post from "../components/Post";
import styles from "../styles/Home.module.css";
import { getCzechCountryName } from "../utils/getCzechCountryName";

const animatedComponents = makeAnimated();

const customStyles = {
  option: (defaultStyles: any, state: any) => ({
    ...defaultStyles,
    color: state.isSelected ? "#212529" : "#fff",
    backgroundColor: state.isSelected ? "#a0a0a0" : "#212529",
  }),

  control: (defaultStyles: any) => ({
    ...defaultStyles,
    backgroundColor: "#212529",
    padding: "10px",
    border: "none",
    boxShadow: "none",
  }),
  singleValue: (defaultStyles: any) => ({ ...defaultStyles, color: "#fff" }),
};

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
  return {
    props: {
      posts,
    },
    revalidate: 100,
  };
}

export default function Home({ posts }: any) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  if (!posts) return null;

  const showedPosts = posts.slice(0, posts.length - 1);

  const uniqueCountries = Array.from(
    new Set(showedPosts.map(({ country }: any) => country))
  );

  const selectOptions = uniqueCountries.map((country: any) => {
    return {
      value: country,
      label: getCzechCountryName(country) || country,
      // color: "#0a7a84",
    };
  });

  const handleChange = (selected: any) => {
    setSelectedOptions(selected);
  };

  const filteredPosts =
    selectedOptions.length === 0
      ? showedPosts
      : showedPosts.filter(({ country }: any) =>
          selectedOptions.map(({ value }) => value).includes(country)
        );

  return (
    <Base>
      <section className={styles.content}>
        <Select
          components={animatedComponents}
          options={selectOptions}
          onChange={handleChange}
          isMulti
          closeMenuOnSelect={false}
          styles={customStyles}
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

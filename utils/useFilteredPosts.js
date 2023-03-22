import { useEffect, useState } from "react";

// not used

function useFilteredPosts() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [options, setOptions] = useState([]);

  const handleSetOptions = (selected, posts) => {
    setOptions(selected);
    setData(posts);
    setLoading(false);
  };

  useEffect(() => {
    if (options.length > 0) {
      const filteredPosts = data.filter(({ country }) =>
        options.map(({ value }) => value).includes(country)
      );
      setData(filteredPosts);
      setLoading(false);
    }
  }, []);

  console.log("V HOOKU", data, "loading", loading);

  return { data, loading, handleSetOptions };
}

export default useFilteredPosts;

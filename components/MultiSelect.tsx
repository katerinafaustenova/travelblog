import Select from "react-select";
import makeAnimated from "react-select/animated";
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

function MultiSelect({ posts, setSelectedOptions }: any) {
  const uniqueCountries = Array.from(
    new Set(posts.map(({ country }: any) => country))
  );

  const options = uniqueCountries.map((country: any) => {
    return {
      value: country,
      label: getCzechCountryName(country),
    };
  });

  const handleChange = (selected: any) => {
    setSelectedOptions(selected);
  };

  return (
    <Select
      components={animatedComponents}
      options={options}
      onChange={handleChange}
      isMulti
      closeMenuOnSelect={false}
      styles={customStyles}
    />
  );
}

export default MultiSelect;

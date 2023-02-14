import Select from "react-select";
import makeAnimated from "react-select/animated";
import { customStyles } from "../utils/customMultiSelectStyles";
import { getCzechCountryName } from "../utils/getCzechCountryName";

const animatedComponents = makeAnimated();

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
      placeholder="Filtr"
      noOptionsMessage={() => "Žádné další možnosti"}
      classNamePrefix="react-select"
    />
  );
}

export default MultiSelect;

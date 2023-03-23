import { useContext } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import LangContext from "../context/LangContext";
import { customStyles } from "../utils/customMultiSelectStyles";
import { getCzechCountryName } from "../utils/getCzechCountryName";

const animatedComponents = makeAnimated();

export function MultiSelect({ posts, setSelectedOptions }: any) {
  const { enLang } = useContext(LangContext);

  const uniqueCountries = Array.from(
    new Set(posts.map(({ country }: any) => country))
  );

  const options = uniqueCountries.map((country: any) => {
    return {
      value: country,
      label: enLang ? country : getCzechCountryName(country),
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
      placeholder={enLang ? "Filter" : "Filtr"}
      noOptionsMessage={() =>
        enLang ? "No other options" : "Žádné další možnosti"
      }
      classNamePrefix="react-select"
    />
  );
}

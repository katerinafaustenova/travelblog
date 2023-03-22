export const countries = [
  {
    value: "Indonesia",
    label: "Indonésie",
  },
  {
    value: "Philippines",
    label: "Filipíny",
  },
  {
    value: "Vietnam",
    label: "Vietnam",
  },
];

export const getCzechCountryName = (country: string) => {
  const newCountry = countries.find((item) => item.value === country)?.label;
  return newCountry || country;
};

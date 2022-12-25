export const countries = [
  {
    value: "Indonesia",
    label: "Indonésie",
  },
  {
    value: "Philippines",
    label: "Filipíny",
  },
];

export const getCzechCountryName = (country: string | null) => {
  const newCountry = countries.find((item) => item.value === country)?.label;
  return newCountry || country;
};

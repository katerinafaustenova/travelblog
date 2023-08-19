export const countries = [
  {
    value: "Thailand",
    label: "Thajsko",
  },
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
  {
    value: "Canada",
    label: "Kanada",
  },
  {
    value: "USA",
    label: "USA",
  },
];

export const getCzechCountryName = (country: string) => {
  const newCountry = countries.find((item) => item.value === country)?.label;
  return newCountry || country;
};

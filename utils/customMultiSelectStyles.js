export const customStyles = {
  control: (styles, { isFocused }) => ({
    display: "flex",
    width: "360px",
    marginLeft: "auto",
    borderRadius: "10px",
    border: "1px solid",
    borderColor: isFocused ? "#07555c" : "#c2c2c2",
  }),
  placeholder: (styles, state) => {
    return {
      ...styles,
      color: "#07555c",
      fontSize: "14px",
    };
  },
  menu: (styles, state) => {
    return {
      ...styles,
      width: "360px",
      right: "0",
      top: "33px",
      borderRadius: "10px",
      overflow: "hidden",
    };
  },
  option: (styles, { isFocused, isSelected, isDisabled, data }) => {
    return {
      ...styles,
      backgroundColor: isFocused ? "#0c778521" : "white",
      color: isDisabled ? "#ccc" : "#07555c",
      fontSize: "14px",

      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled
          ? isSelected
            ? data.color
            : "#0c778521"
          : undefined,
      },
      ":hover": {
        cursor: "pointer",
      },
    };
  },
  noOptionsMessage: (styles, state) => {
    return {
      ...styles,
      fontSize: "14px",
    };
  },
  multiValue: (styles, state) => {
    return {
      ...styles,
      backgroundColor: "#0c778521",
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color,
    fontSize: "13px",
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ":hover": {
      backgroundColor: "#0c778561",
      color: "white",
      cursor: "pointer",
    },
  }),
  clearIndicator: (styles, state) => ({
    ...styles,
    ":hover": {
      cursor: "pointer",
    },
  }),
  dropdownIndicator: (styles, state) => ({
    ...styles,
    ":hover": {
      cursor: "pointer",
    },
  }),
};

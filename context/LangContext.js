import { createContext, useEffect, useState } from "react";

const LangContext = createContext();

export const LangProvider = ({ children }) => {
  const [enLang, setEnLang] = useState(false);

  useEffect(() => {
    const storageValue = JSON.parse(localStorage.getItem("enLang"));
    if (storageValue !== null) {
      setEnLang(storageValue);
    }
  }, []);

  const toggleEnLang = () => {
    setEnLang((prevState) => !prevState);
    localStorage.setItem("enLang", JSON.stringify(!enLang));
  };

  return (
    <LangContext.Provider value={{ enLang, toggleEnLang }}>
      {children}
    </LangContext.Provider>
  );
};

export default LangContext;

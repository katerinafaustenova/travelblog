import { createContext, useEffect, useState } from "react";

const LangContext = createContext();

export const LangProvider = ({ children }) => {
  const [enLang, setEnLang] = useState(false);

  useEffect(() => {
    const storageValue = localStorage.getItem("enLang");
    if (storageValue !== null) {
      setEnLang(storageValue);
    }
  }, []);

  const toggleEnLang = () => {
    setEnLang((prevState) => !prevState);
    localStorage.setItem("enLang", !enLang);
  };

  return (
    <LangContext.Provider value={{ enLang, toggleEnLang }}>
      {children}
    </LangContext.Provider>
  );
};

export default LangContext;

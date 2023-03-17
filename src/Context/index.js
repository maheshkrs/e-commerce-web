import React, { useState, useEffect, useContext } from "react";
import { createContext } from "react";
export const ProjectContext = React.createContext();

const ProjectProvider = ({ children }) => {
  const [isData, setIsData] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  // const { productId, setproductId } = useState("");
     

  return (
    <ProjectContext.Provider
      value={{
        isData,
        isLoggedIn,
       
        setIsData,
        setIsLoggedIn,
    
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export { ProjectProvider };

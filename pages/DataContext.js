import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [collectionData, setCollectionData] = useState({});

  return (
    <DataContext.Provider value={{ collectionData, setCollectionData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
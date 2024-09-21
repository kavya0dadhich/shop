import { createContext, useState } from 'react';

const MyContext = createContext();

// eslint-disable-next-line react/prop-types
const MyProvider = ({ children }) => {
  const [data, setData] = useState([]);
  console.log(data);
  return (
    <MyContext.Provider value={{ data, setData }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };

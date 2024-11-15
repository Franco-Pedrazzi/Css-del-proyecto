import { useState, createContext } from "react";

const Account = createContext();

function AppContext({ children }) {
  const [AccountData, SetAccountData] = useState({id:false});

  return (
    <Account.Provider value={{ AccountData, SetAccountData }}>
      {children}
    </Account.Provider>
  );
}

export { AppContext, Account };
export default AppContext;
import { createContext, useState } from "react";

export const adminContext = createContext();

const Admin = ({ children }) => {
  const [adminDetails, setAdminDetails] = useState([]);
  const [loggedin, setLoggedIn] = useState(false);

  return (
    <adminContext.Provider
      value={{ adminDetails, loggedin, setLoggedIn, setAdminDetails }}
    >
      {children}
    </adminContext.Provider>
  );
};

export default Admin;

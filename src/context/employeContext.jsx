import { createContext, useEffect, useState } from "react";
import axios from "../axios";

export const employeeContext = createContext();

const Employee = ({ children }) => {
  const [employeeInfo, setEmployeeInfo] = useState([]);

  const getEmployeeDetails = async () => {
    const response = await axios.get("/employees");
    setEmployeeInfo(response.data.data);
  };

  useEffect(() => {
    getEmployeeDetails();
  }, []);

  return (
    <employeeContext.Provider value={{ employeeInfo, setEmployeeInfo }}>
      {children}
    </employeeContext.Provider>
  );
};

export default Employee;

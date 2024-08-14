import { useContext } from "react";
import { employeeContext } from "../context/employeContext";
import { adminContext } from "../context/adminContext";

export default function Home() {
  const { employeeInfo, setEmployeeInfo } = useContext(employeeContext);
  const { adminDetails, setAdminDetails } = useContext(adminContext);
  return (
    <div className=" flex flex-col items-center justify-center  gap-5">
      <h1>Welcome Home!</h1>
      <h2>Total Employee: {employeeInfo.length}</h2>
      <div>
        {employeeInfo.map((employee) => (
          <div key={employee._id} className=" flex gap-2">
            <h3>Name: {employee.username}</h3>
            <p>Designation: {employee.designation}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

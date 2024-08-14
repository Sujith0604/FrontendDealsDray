import { useContext, useState } from "react";
import { employeeContext } from "../context/employeContext";
import axios from "../axios";
import UpdateEmployees from "./UpdateEmployees";

export default function EmployeeList() {
  const { employeeInfo, setEmployeeInfo } = useContext(employeeContext);
  const [editId, setEditId] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [query, setQuery] = useState("");

  const filteredProducts = employeeInfo.filter((user) => {
    return (
      user?.username.toLowerCase().includes(query.toLowerCase()) ||
      user?.email.toLowerCase().includes(query.toLowerCase()) ||
      user?._id.toLowerCase().includes(query.toLowerCase()) ||
      user?.designation.toLowerCase().includes(query.toLowerCase()) ||
      user?.createdAt.includes(query)
    );
  });

  const handleEdit = (id) => {
    setIsEdit(true);
    setEditId(id);
  };

  const handleDate = (dates) => {
    const newDates = new Date(dates);
    const formattedDate = newDates.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    return formattedDate;
  };
  const handleDelete = (id) => {
    axios.delete(`/employees/${id}`);
    setEmployeeInfo(employeeInfo.filter((employee) => employee._id !== id));
  };

  if (isEdit)
    return (
      <UpdateEmployees
        editId={editId}
        setEditId={setEditId}
        setIsEdit={setIsEdit}
      />
    );

  return (
    <div className=" flex flex-col gap-10">
      <div>
        <label>Search</label>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className=" border p-4"
        />
      </div>
      <table className=" w-[100%] border">
        <thead className=" border">
          <tr className=" border">
            <th>SNO</th>
            <th>Created At</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Gender</th>
            <th>Designation</th>
            <th>Course</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className=" border">
          {filteredProducts.map((employee, index) => (
            <tr key={employee._id} className=" border">
              <td>{index + 1}</td>
              <td>{handleDate(employee.createdAt)}</td>
              <td>
                <img
                  className=" h-[100px] w-[100px]  rounded-full"
                  src={`http://localhost:3000/${employee.imageUpload}`}
                  alt="Avatar"
                />
              </td>
              <td>{employee.username}</td>
              <td>{employee.email}</td>
              <td>{employee.mobile}</td>
              <td>{employee.gender}</td>
              <td>{employee.designation}</td>
              <td>{employee.course.join(" , ")}</td>

              <td className="flex items-center justify-center gap-5">
                <button
                  className=" bg-red-500 px-4 py-2"
                  onClick={() => handleEdit(employee._id)}
                >
                  Edit
                </button>
                <button
                  className=" bg-red-500 px-4 py-2"
                  onClick={() => handleDelete(employee._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

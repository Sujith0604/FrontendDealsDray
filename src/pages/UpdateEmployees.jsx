import { useContext, useEffect, useState } from "react";
import axios from "../axios";
import { employeeContext } from "../context/employeContext";

export default function UpdateEmployees({ setEditId, setIsEdit, editId }) {
  const { employeeInfo, setEmployeeInfo } = useContext(employeeContext);

  const [employeeDetails, setEmployeeDetails] = useState({
    username: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: [],
    imageUpload: "",
  });

  console.log(employeeDetails);

  const fetchSingleEmloyee = async () => {
    const res = await axios.get(`/employees/${editId}`);
    setEmployeeDetails({
      username: res.data.data.username,
      email: res.data.data.email,
      mobile: res.data.data.mobile,
      designation: res.data.data.designation,
      gender: res.data.data.gender,
      course: res.data.data.course,
      imageUpload: res.data.data.image,
    });
  };

  useEffect(() => {
    fetchSingleEmloyee();
  }, [editId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeDetails({ ...employeeDetails, [name]: value });
  };

  const handleCheckBox = (e) => {
    const { name, checked } = e.target;
    let newCourse = [...employeeDetails.course];
    if (checked) {
      newCourse.push(name);
    } else {
      newCourse = newCourse.filter((c) => c !== name);
    }
    setEmployeeDetails({ ...employeeDetails, course: newCourse });
  };

  const handleChangeFile = (e) => {
    setEmployeeDetails({ ...employeeDetails, imageUpload: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", employeeDetails.username);
    formData.append("email", employeeDetails.email);
    formData.append("mobile", employeeDetails.mobile);
    formData.append("designation", employeeDetails.designation);
    formData.append("gender", employeeDetails.gender);
    formData.append("course", employeeDetails.course);
    if (employeeDetails.imageUpload?.[0]) {
      formData.append("imageUpload", employeeDetails.imageUpload);
    }
    formData.append("imageUpload", employeeDetails.imageUpload);
    try {
      const response = await axios.put(`/employees/${editId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Employee updated successfully: ", response.data.data);

      setEmployeeInfo(
        employeeInfo.map((employee) => {
          if (employee._id === editId) {
            return response.data.data;
          }
          return employee;
        })
      );
      setIsEdit(false);
      setEditId("");
    } catch (error) {
      console.error("Error updating employee: ", error.message);
    }
  };
  return (
    <div>
      <section className=" text-2xl font-bold">UPDATE EMPLOYEE</section>
      <section>
        <form
          onSubmit={handleSubmit}
          className=" bg-blue-200 p-4 flex flex-col gap-5 "
        >
          <div className=" flex items-center justify-between w-full ">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={employeeDetails.username}
              onChange={handleChange}
            />
          </div>
          <div className=" flex items-center justify-between w-full ">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              name="email"
              value={employeeDetails.email}
              onChange={handleChange}
            />
          </div>
          <div className=" flex items-center justify-between w-full ">
            <label htmlFor="mobile">Mobile:</label>
            <input
              type="number"
              placeholder="Enter Mobile Number"
              id="mobile"
              name="mobile"
              value={employeeDetails.mobile}
              onChange={handleChange}
            />
          </div>

          <div className=" flex items-center justify-between w-full ">
            <label htmlFor="designation">Designation:</label>
            <select
              name="designation"
              value={employeeDetails.designation}
              onChange={handleChange}
            >
              <option value="">Select Designation</option>
              <option value="Manager">Manager</option>
              <option value="HR">HR</option>
              <option value="Sales">Sales</option>
            </select>
          </div>
          <div className=" flex items-center justify-between w-full ">
            <label htmlFor="gender">Gender:</label>
            MALE :
            <input
              type="radio"
              id="Male"
              name="gender"
              value="Male"
              onChange={handleChange}
              checked={employeeDetails.gender === "Male"}
            />
            FEMALE:
            <input
              type="radio"
              id="Female"
              name="gender"
              value="Female"
              onChange={handleChange}
              checked={employeeDetails.gender === "Female"}
            />
          </div>

          <div className=" flex items-center justify-between w-full ">
            <label htmlFor="course">Course:</label>
            MCA :
            <input
              type="checkbox"
              id="MCA"
              name="MCA"
              checked={employeeDetails.course.includes("MCA") !== -1}
              defaultValue="MCA"
              onChange={handleCheckBox}
            />
            BCA :
            <input
              type="checkbox"
              id="BCA"
              name="BCA"
              checked={employeeDetails.course.includes("BCA") !== -1}
              defaultValue="BCA"
              onChange={handleCheckBox}
            />
            BSC :
            <input
              type="checkbox"
              id="BSC"
              name="BSC"
              checked={employeeDetails.course.includes("BSC") !== -1}
              defaultValue="BSC"
              onChange={handleCheckBox}
            />
          </div>

          <div className=" flex items-center justify-between w-full ">
            <label>Image</label>
            <input
              type="file"
              accept="image/jpeg"
              id="imageUpload"
              name="imageUpload"
              defaultValue={employeeDetails.imageUpload}
              onChange={handleChangeFile}
            />
          </div>

          <div>
            <button className=" bg-red-400 p-4" type="submit">
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

import { useContext, useState } from "react";
import axios from "../axios";
import { employeeContext } from "../context/employeContext";

export default function Register() {
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

  const [errors, setErrors] = useState(null);

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

  const validateEmail = (email) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };
  const validateMobile = (mobile) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(mobile);
  };

  // const validateImage = (image) => {
  //   const imageRegex = /\.(jpg|jpeg)$/;
  //   return imageRegex.test(image);
  // };

  const validateFormdata = (data) => {
    let newErrors = {};
    if (!data.username) {
      newErrors.username = "Username is required";
    }
    if (!data.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(data.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!data.mobile) {
      newErrors.mobile = "Mobile is required";
    } else if (!validateMobile(data.mobile)) {
      newErrors.mobile = "Invalid mobile format";
    }
    if (!data.designation) {
      newErrors.designation = "Designation is required";
    }
    if (!data.gender) {
      newErrors.gender = "Gender is required";
    }
    if (!data.course.length) {
      newErrors.course = "At least one course is required";
    }
    if (!data.imageUpload) {
      newErrors.imageUpload = "Image is required";
    } //else if (!validateImage(data.imageUpload)) {
    //   newErrors.imageUpload = "Invalid image format (jpg/jpeg only)";
    // }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valid = validateFormdata(employeeDetails);
    if (valid) {
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

      const response = await axios.post("/employees", employeeDetails, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      setEmployeeInfo([...employeeInfo, response.data.data]);

      setEmployeeDetails({
        username: "",
        email: "",
        mobile: "",
        designation: "",
        gender: "",
        course: [],
        imageUpload: "",
      });
    } else {
      console.log("Check the details");
    }
  };

  return (
    <div className="flex flex-col gap-5 items-center justify-center h-screen">
      <section className=" text-2xl font-bold">CREATE EMPLOYEE</section>
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
            {errors?.username && (
              <p className=" text-rose-500">{errors.username}</p>
            )}
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
            {errors?.email && <p className=" text-rose-500">{errors.email}</p>}
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
            {errors?.mobile && (
              <p className=" text-rose-500">{errors.mobile}</p>
            )}
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
            {errors && <p className=" text-rose-500">{errors.designation}</p>}
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
            />
            FEMALE:
            <input
              type="radio"
              id="Female"
              name="gender"
              value="Female"
              onChange={handleChange}
            />
            {errors?.gender && (
              <p className=" text-rose-500">{errors.gender}</p>
            )}
          </div>

          <div className=" flex items-center justify-between w-full ">
            <label htmlFor="course">Course:</label>
            MCA :
            <input
              type="checkbox"
              id="MCA"
              name="MCA"
              checked={employeeDetails.course.includes("MCA")}
              value={employeeDetails.course}
              onChange={handleCheckBox}
            />
            BCA :
            <input
              type="checkbox"
              id="BCA"
              name="BCA"
              checked={employeeDetails.course.includes("BCA")}
              value={employeeDetails.course}
              onChange={handleCheckBox}
            />
            BSA :
            <input
              type="checkbox"
              id="BSC"
              name="BSC"
              checked={employeeDetails.course.includes("BSC")}
              value={employeeDetails.course}
              onChange={handleCheckBox}
            />
            {errors?.designation && (
              <p className=" text-rose-500">{errors.course}</p>
            )}
          </div>

          <div className=" flex items-center justify-between w-full ">
            <label>Image</label>
            <input
              type="file"
              accept="image/jpeg"
              id="imageUpload"
              name="imageUpload"
              onChange={handleChangeFile}
            />
            {errors?.imageUpload && (
              <p className=" text-rose-500">{errors.imageUpload}</p>
            )}
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

import { useNavigate } from "react-router-dom";
import axios from "../axios";
import { useContext, useState } from "react";
import { adminContext } from "../context/adminContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loggedin, setLoggedIn } = useContext(adminContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("/admin/login", {
      email,
      password,
    });
    let data = res.data.data;
    localStorage.setItem("admin", data.email);
    setLoggedIn(true);
    if (
      loggedin &&
      localStorage.getItem("admin") === "sujithkarthikaiselvan@gmail.com"
    ) {
      navigate("/home");
    }
  };

  return (
    <div className=" h-screen flex flex-col items-center justify-center">
      <div className=" text-xl font-bold">LOGIN</div>
      <form
        onSubmit={handleSubmit}
        className=" bg-blue-200 p-4 flex flex-col gap-5 w-[300px] "
      >
        <div className=" flex items-center justify-between w-full ">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className=" flex items-center justify-between w-full ">
          <label htmlFor="email">Email:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            name="email"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button className=" bg-red-400 p-4" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { adminContext } from "../context/adminContext";

export default function Header() {
  const { loggedin, setLoggedIn } = useContext(adminContext);

  const handleLogOut = () => {
    setLoggedIn(false);
    localStorage.clear();
  };

  return (
    <header className="flex items-center justify-between w-[100%] h-[100px] bg-green-400 p-4">
      <div>DEALSDRAY</div>
      <nav>
        <ul className=" flex items-center justify-center gap-5">
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>
          <li>
            <NavLink to="/register">Add-Employee</NavLink>
          </li>
          <li>
            <NavLink to="/list">EmployeeList</NavLink>
          </li>
          {loggedin && (
            <li>
              <button className=" hover:cursor-pointer" onClick={handleLogOut}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

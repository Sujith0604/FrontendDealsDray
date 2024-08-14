import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { adminContext } from "../context/adminContext";

export default function ProtectedRoute({ children }) {
  const { loggedin } = useContext(adminContext);

  if (loggedin && localStorage.getItem("admin")) {
    return children;
  }
  return <Navigate to="/" />;
}

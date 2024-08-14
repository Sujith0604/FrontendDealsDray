import { Route, Routes } from "react-router-dom";
import Login from "./authentication/Login";
import Register from "./authentication/Register";
import EmployeeList from "./pages/EmployeeList";
import AppLayout from "./AppLayout";
import UpdateEmployees from "./pages/UpdateEmployees";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="/list" element={<EmployeeList />} />
          <Route path="/updatelist" element={<UpdateEmployees />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </div>
  );
}

import { Routes, Route, Navigate } from "react-router-dom";

import { LoginScreen } from "../components/auth/LoginScreen";
import { RegisterScreen } from "../components/auth/RegisterScreen";

import "../components/auth/style.css";
import { PublicRoute } from "./PublicRoute";

export const AuthRouter = () => {
  return (
    <div className="main">
      <div className="main-container bg-light">
        <Routes>
          <Route
            path="login"
            element={
              <PublicRoute>
                <LoginScreen />
              </PublicRoute>
            }
          />
          <Route
            path="register"
            element={
              <PublicRoute>
                <RegisterScreen />
              </PublicRoute>
            }
          />
          <Route path="*" element={<Navigate to="login" replace={true} />} />
        </Routes>
      </div>
    </div>
  );
};

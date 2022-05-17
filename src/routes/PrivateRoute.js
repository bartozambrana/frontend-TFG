import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ children }) => {
  const state = useSelector((state) => state.auth);

  return !!state.user ? children : <Navigate to="/about" />;
};

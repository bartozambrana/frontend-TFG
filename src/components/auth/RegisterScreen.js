import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import validator from "validator";

import { startRegister } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";

export const RegisterScreen = () => {
  const dispatch = useDispatch();

  const [formValues, handleInputChange] = useForm({
    userName: "",
    password: "",
    confirmPassword: "",
    type: false,
    email: "",
  });

  const { userName, password, confirmPassword, email, type } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(startRegister(email, password, userName, type));
    }
  };

  const isFormValid = () => {
    if (userName.trim().length === 0) {
      Swal.fire("Error", "Nombre vacío", "error");
      return false;
    } else if (!validator.isEmail(email)) {
      Swal.fire("Error", "Email inválido", "error");
      return false;
    } else if (password !== confirmPassword || password.length < 5) {
      Swal.fire("Error", "Las contraseñas no coinciden", "error");
      return false;
    }
    return true;
  };

  return (
    <>
      <h3 className="auth-title">Registo de usuario</h3>

      <form className="form-group" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nombre de usuario"
          name="userName"
          autoComplete="off"
          className="form-control w-100 mt-3 "
          value={userName}
          onChange={handleInputChange}
        />

        <input
          type="text"
          placeholder="Email"
          name="email"
          autoComplete="off"
          className="form-control w-100 mt-3 "
          value={email}
          onChange={handleInputChange}
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          autoComplete="off"
          className="form-control w-100 mt-3"
          value={password}
          onChange={handleInputChange}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          autoComplete="off"
          className="form-control w-100 mt-3"
          value={confirmPassword}
          onChange={handleInputChange}
        />

        <div className="form-check form-switch mt-3">
          <label htmlFor="flexSwitchCheckDefault">
            <input
              className="form-check-input"
              id="flexSwitchCheckDefault"
              type="checkbox"
              name="type"
              checked={type}
              onChange={handleInputChange}
            />
            Cliente / Empresario
          </label>
        </div>

        <button type="submit" className="btn btn-outline-dark mt-3">
          Enviar
        </button>
      </form>

      <Link className="text-end link-dark" to="/auth/login">
        Iniciar Sesión
      </Link>
    </>
  );
};

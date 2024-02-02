import { useForm } from "react-hook-form";
import "./LoginPage.scss";
import { useAuthStore } from "../../hooks";
import { useEffect } from "react";
import Swal from "sweetalert2";
import CalendarIcon from "../images/Tu_Calendario_Icon.jpg";
import FondoLogin from "../images/Fondo_Login.jpg";

export const LoginPage = () => {
  const loginForm = useForm();
  const registerForm = useForm();
  const { startLogin, errorMessage, startRegister } = useAuthStore();

  const {
    register: loginRegister,
    handleSubmit: loginHandleSubmit,
    formState: { errors: loginErrors },
  } = loginForm;

  const {
    register: registerRegister,
    handleSubmit: registerHandleSubmit,
    formState: { errors: registerErrors },
    reset,
  } = registerForm;

  const onLoginSubmit = (data) => {
    startLogin(data);
  };

  const onRegisterSubmit = (data) => {
    const { password, password2 } = data;
    if (password !== password2) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Las contraseñas no coinciden!",
        showConfirmButton: false,
        timer: 1500,
      });
      reset();
      return;
    }
    const dataToSend = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    startRegister(dataToSend);
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error en la autenticacion",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [errorMessage]);

  return (
    <div
      className="container-fluid login-container"
      style={{
        backgroundImage: `url(${FondoLogin})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="row">
        <h1 className="login-container-title">
          <span>
            <img
              style={{ width: "70px", height: "70px" }}
              src={CalendarIcon}
              alt="Icono Calendario"
            />
          </span>{" "}
          Calendario
        </h1>
        <small className="login-container-subtitle">
          Registrate o inicia sesion para acceder a un calendario dinamico donde
          podras agregar tus eventos favoritos y tambien ver los eventos de tus
          amigos!
        </small>
      </div>

      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Iniciar Sesion</h3>
          <form onSubmit={loginHandleSubmit(onLoginSubmit)}>
            <div className="form-group mb-2">
              <div className="group">
                <svg
                  stroke="currentColor"
                  strokeWidth="1.5"
                  width="16"
                  height="16"
                  viewBox="0 0 15 18"
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon"
                >
                  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                </svg>
                <input
                  type="text"
                  className="form-control input"
                  placeholder="Correo"
                  {...loginRegister("email", { required: true })}
                />
                {loginErrors?.email?.type === "required" && (
                  <div className="alert alert-danger mt-1" role="alert">
                    Este campo es requerido!
                  </div>
                )}
              </div>
            </div>

            <div className="form-group mb-2">
              <div className="group">
                <svg
                  stroke="currentColor"
                  strokeWidth="1.5"
                  width="16"
                  height="16"
                  viewBox="0 0 15 18"
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm0 5a1.5 1.5 0 0 1 .5 2.915l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99A1.5 1.5 0 0 1 8 5z"
                  />
                </svg>
                <input
                  type="password"
                  className="form-control input"
                  placeholder="Contraseña"
                  {...loginRegister("password", {
                    required: true,
                    minLength: 6,
                  })}
                />
                {loginErrors?.password?.type === "required" && (
                  <div className="alert alert-danger mt-1" role="alert">
                    Este campo es requerido!
                  </div>
                )}
                {loginErrors?.password?.type === "minLength" && (
                  <div className="alert alert-danger mt-1" role="alert">
                    La contraseña debe tener al menos 6 caracteres!
                  </div>
                )}
              </div>
            </div>

            <div className="form-group mb-2">
              <button type="submit" className="button">
                <span className="button-content">Iniciar Sesion</span>
              </button>
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={registerHandleSubmit(onRegisterSubmit)}>
            <div className="form-group mb-2">
              <div className="group">
                <svg
                  stroke="currentColor"
                  strokeWidth="1.5"
                  width="16"
                  height="16"
                  viewBox="0 0 15 18"
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon"
                >
                  <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
                </svg>

                <input
                  type="text"
                  className="form-control input"
                  placeholder="Nombre y Apellido"
                  {...registerRegister("name", { required: true })}
                />
                {registerErrors?.name?.type === "required" && (
                  <div className="alert alert-danger mt-1" role="alert">
                    Este campo es requerido!
                  </div>
                )}
              </div>
            </div>

            <div className="form-group mb-2">
              <div className="group">
                <svg
                  stroke="currentColor"
                  strokeWidth="1.5"
                  width="16"
                  height="16"
                  viewBox="0 0 15 18"
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon"
                >
                  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                </svg>

                <input
                  type="email"
                  className="form-control input"
                  placeholder="Correo"
                  {...registerRegister("email", { required: true })}
                />
                {registerErrors?.email?.type === "required" && (
                  <div className="alert alert-danger mt-1" role="alert">
                    Este campo es requerido!
                  </div>
                )}
              </div>
            </div>

            <div className="form-group mb-2">
              <div className="group">
                <svg
                  stroke="currentColor"
                  strokeWidth="1.5"
                  width="16"
                  height="16"
                  viewBox="0 0 15 18"
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm0 5a1.5 1.5 0 0 1 .5 2.915l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99A1.5 1.5 0 0 1 8 5z"
                  />
                </svg>
                <input
                  type="password"
                  className="form-control input"
                  placeholder="Contraseña"
                  {...registerRegister("password", {
                    required: true,
                    minLength: 6,
                  })}
                />
                {registerErrors?.password?.type === "required" && (
                  <div className="alert alert-danger mt-1" role="alert">
                    Este campo es requerido!
                  </div>
                )}
                {registerErrors?.password?.type === "minLength" && (
                  <div className="alert alert-danger mt-1" role="alert">
                    La contraseña debe tener al menos 6 caracteres!
                  </div>
                )}
              </div>
            </div>

            <div className="form-group mb-2">
              <div className="group">
                <svg
                  stroke="currentColor"
                  strokeWidth="1.5"
                  width="16"
                  height="16"
                  viewBox="0 0 15 18"
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm0 5a1.5 1.5 0 0 1 .5 2.915l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99A1.5 1.5 0 0 1 8 5z"
                  />
                </svg>
                <input
                  type="password"
                  className="form-control input"
                  placeholder="Repita la contraseña"
                  {...registerRegister("password2", {
                    required: true,
                    minLength: 6,
                  })}
                />
                {registerErrors?.password2?.type === "required" && (
                  <div className="alert alert-danger mt-1" role="alert">
                    Este campo es requerido!
                  </div>
                )}
                {registerErrors?.password2?.type === "minLength" && (
                  <div className="alert alert-danger mt-1" role="alert">
                    La contraseña debe tener al menos 6 caracteres!
                  </div>
                )}
              </div>
            </div>

            <div className="form-group mb-2">
              <button type="submit" className="button">
                <span className="button-content">Crear Cuenta</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

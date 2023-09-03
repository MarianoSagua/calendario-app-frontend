import { useForm } from "react-hook-form";
import "./LoginPage.css";
import { useAuthStore } from "../../hooks";
import { useEffect } from "react";
import Swal from "sweetalert2";

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
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={loginHandleSubmit(onLoginSubmit)}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                {...loginRegister("email", { required: true })}
              />

              {loginErrors?.email?.type === "required" && (
                <div className="alert alert-danger mt-1" role="alert">
                  Este campo es requerido!
                </div>
              )}
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                {...loginRegister("password", { required: true, minLength: 6 })}
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

            <div className="form-group mb-2">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={registerHandleSubmit(onRegisterSubmit)}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                {...registerRegister("name", { required: true })}
              />
              {registerErrors?.name?.type === "required" && (
                <div className="alert alert-danger mt-1" role="alert">
                  Este campo es requerido!
                </div>
              )}
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                {...registerRegister("email", { required: true })}
              />
              {registerErrors?.email?.type === "required" && (
                <div className="alert alert-danger mt-1" role="alert">
                  Este campo es requerido!
                </div>
              )}
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
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
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
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

            <div className="form-group mb-2">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

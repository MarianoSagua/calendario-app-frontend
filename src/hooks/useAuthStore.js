import { useDispatch, useSelector } from "react-redux";
import instance from "../API/calendarApi";
import {
  onChecking,
  onClearErrorMessage,
  onLogin,
  onLogout,
} from "../store/slices/authSlice";
import { onLogoutCalendar } from "../store/slices/calendarSlice";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await instance.post("auth", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(onLogout("Email o contraseña incorrecta!"));
      setTimeout(() => {
        dispatch(onClearErrorMessage());
      }, 500);
    }
  };

  const startRegister = async ({ email, password, name }) => {
    dispatch(onChecking());
    try {
      const { data } = await instance.post("auth/register", {
        email,
        password,
        name,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      const { response } = error;
      const message = response?.data?.msg;

      if (message !== undefined) {
        dispatch(onLogout(message));
      } else {
        dispatch(onLogout("Falta uno de los campos del registro"));
      }
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(onLogout());

    try {
      const { data } = await instance.get("auth/renew");

      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const startLogOut = async () => {
    localStorage.clear();
    dispatch(onLogoutCalendar());
    dispatch(onLogout());
  };

  return {
    //Propiedades
    errorMessage,
    status,
    user,

    //Metodos
    startLogin,
    startRegister,
    checkAuthToken,
    startLogOut,
  };
};

import { useAuthStore, useCalendarStore } from "../../hooks";
import CalendarIcon from "../images/Tu_Calendario_Icon.jpg";

export const Navbar = () => {
  const { startLogOut, user } = useAuthStore();
  const { themeMode } = useCalendarStore();

  return (
    <nav
      className={`navbar navbar-expand-lg  ${
        themeMode === "dark" ? "bg-dark" : ""
      }  border-body px-2`}
      data-bs-theme={`${themeMode === "dark" ? "dark" : ""}`}
    >
      <div class="container-fluid">
        <div class="navbar-brand">
          <img
            src={CalendarIcon}
            alt="Logo"
            width="40"
            height="34"
            class="d-inline-block align-text-center"
          />
          Tu Calendario
        </div>
        <button
          class="navbar-toggler border border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          <div className="navbar-logoutPart">
            <span className="navbar-brand">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-person-fill"
                viewBox="0 0 16 16"
              >
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
              </svg>
              &nbsp;{user.name}
            </span>

            <button className="btn btn-danger" onClick={startLogOut}>
              Cerrar Sesion
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

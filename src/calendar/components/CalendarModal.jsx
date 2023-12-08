import { useEffect, useMemo, useState } from "react";
import { addHours, differenceInSeconds } from "date-fns";
import DatePicker, { registerLocale } from "react-datepicker";
import { useCalendarStore } from "../../hooks";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

registerLocale("es", es);

export const CalendarModal = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const {
    activeEvent,
    newEventState,
    startSavingEvent,
    startDeletingEvent,
    setRemoveNewEventState,
  } = useCalendarStore();

  const [formValues, setFormValues] = useState({
    title: "",
    notes: "",
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const titleClass = useMemo(() => {
    if (!formSubmitted) return "";

    return formValues.title.length > 0 ? "" : "is-invalid";
  }, [formValues.title, formSubmitted]);

  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({ ...activeEvent });
    }
  }, [activeEvent]);

  const onInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onDateChanged = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    setFormSubmitted(true);

    const difference = differenceInSeconds(formValues.end, formValues.start);

    if (isNaN(difference) || difference <= 0) {
      Swal.fire("Fechas incorrectas", "Revisar las fechas ingresadas", "error");

      return;
    }

    if (formValues.title.length <= 0) return;

    await startSavingEvent(formValues);
    setFormSubmitted(false);
  };

  const handleDelete = () => {
    startDeletingEvent();
    setFormValues({
      title: "",
      notes: "",
      start: new Date(),
      end: addHours(new Date(), 2),
    });
  };

  return (
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            {newEventState ? (
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Nuevo Evento
              </h1>
            ) : (
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Actualizar Evento
              </h1>
            )}

            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setRemoveNewEventState()}
            ></button>
          </div>

          <div class="modal-body">
            <form onSubmit={onSubmit} className="container">
              <div className="form-group mb-3 d-flex flex-column align-items-start">
                <label className="form-label">Fecha y hora inicio</label>
                <DatePicker
                  onChange={(e) => onDateChanged(e, "start")}
                  selected={formValues.start}
                  className="form-control"
                  dateFormat="Pp"
                  showTimeSelect
                  locale="es"
                  timeCaption="Hora"
                />
              </div>

              <div className="form-group mb-3 d-flex flex-column align-items-start">
                <label className="form-label">Fecha y hora fin</label>
                <DatePicker
                  minDate={formValues.start}
                  onChange={(e) => onDateChanged(e, "end")}
                  selected={formValues.end}
                  className="form-control"
                  dateFormat="Pp"
                  showTimeSelect
                  locale="es"
                  timeCaption="Hora"
                />
              </div>

              <hr />

              <div className="form-group mb-2">
                <label className="form-label">Titulo y notas</label>
                <input
                  type="text"
                  className={`form-control ${titleClass}`}
                  placeholder="Título del evento"
                  name="title"
                  autoComplete="off"
                  value={formValues.title}
                  onChange={onInputChange}
                />
              </div>

              <div className="form-group mb-3">
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Notas"
                  rows="5"
                  name="notes"
                  value={formValues.notes}
                  onChange={onInputChange}
                />
              </div>
              
              {newEventState ? (
                <button
                  type="submit"
                  className="btn btn-outline-primary btn-block mt-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-plus-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                  </svg>
                  &nbsp;
                  <span>Agregar</span>
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-outline-primary btn-block mt-2"
                >
                  <i className="far fa-save"></i> &nbsp;
                  <span>Guardar</span>
                </button>
              )}
              &nbsp;
              {!newEventState && (
                <button
                  type="submit"
                  className="btn btn-outline-danger btn-block mt-2"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleDelete}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-trash"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                  </svg>{" "}
                  &nbsp;
                  <span>Eliminar</span>
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

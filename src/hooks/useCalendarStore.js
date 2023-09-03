import { useDispatch, useSelector } from "react-redux";
import instance from "../API/calendarApi";
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from "../store/slices/calendarSlice";
import { convertEventsToDate } from "../helpers";
import Swal from "sweetalert2";

export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    try {
      if (calendarEvent.id) {
        await instance.put(
          `events/actualizarEvento/${calendarEvent.id}`,
          calendarEvent
        );
        dispatch(onUpdateEvent(calendarEvent, user));
        return;
      }

      const { data } = await instance.post("events/crearEvento", calendarEvent);
      dispatch(
        onAddNewEvent({ ...calendarEvent, id: data.eventoGuardado.id, user })
      );
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.response.data.msg,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const startDeletingEvent = async () => {
    try {
      await instance.delete(`events/eliminarEvento/${activeEvent.id}`);
      dispatch(onDeleteEvent());
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.response.data.msg,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await instance.get("events/obtenerEventos");
      const events = convertEventsToDate(data.eventos);
      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents,
  };
};

import { useEffect, useState } from "react";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getMessagesES, localizer } from "../../helpers";
import {
  CalendarEvent,
  CalendarModal,
  FabAddNew,
  FabDelete,
  Navbar,
} from "../components";
import { useAuthStore, useCalendarStore, useUiStore } from "../../hooks";

export const CalendarPage = () => {
  const { user } = useAuthStore();
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

  const eventStylesGetter = (event, start, end, isSelected) => {
    const isMyEvent =
      user.uid === event.user._id || user.uid === event.user.uid;

    const style = {
      backgroundColor: isMyEvent ? "#347cf7" : "#465660",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };

    return {
      style,
    };
  };

  const onDobleClick = () => {
    openDateModal();
  };

  const onSelect = (event) => {
    setActiveEvent(event);
  };

  const onViewChanged = (event) => {
    localStorage.setItem("lastView", event);
    setLastView(event);
  };

  useEffect(() => {
    startLoadingEvents();
  }, []);

  return (
    <>
      <Navbar />

      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        messages={getMessagesES()}
        eventPropGetter={eventStylesGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDobleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};

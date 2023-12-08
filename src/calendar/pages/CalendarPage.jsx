import { useEffect, useState } from "react";
import { useAuthStore, useCalendarStore } from "../../hooks";
import { getMessagesES, localizer } from "../../helpers";
import { CalendarEvent, CalendarModal, FabAddNew, Navbar } from "../components";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

export const CalendarPage = () => {
  const { user } = useAuthStore();
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

  const eventStylesGetter = (event) => {
    const isMyEvent =
      user.uid === event.user._id || user.uid === event.user.uid;

    const style = {
      backgroundColor: isMyEvent ? "#C8B6FF" : "red",
      borderRadius: "0px",
      opacity: 0.8,
      color: isMyEvent ? "black" : "white",
    };

    return {
      style,
    };
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
        style={{
          height: "calc(100vh - 62px)",
        }}
        messages={getMessagesES()}
        eventPropGetter={eventStylesGetter}
        components={{
          event: CalendarEvent,
        }}
        onSelectEvent={onSelect}
        onView={onViewChanged}
        className="pt-4"
      />

      <CalendarModal />
      <FabAddNew />
    </>
  );
};

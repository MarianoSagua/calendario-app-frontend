import { addHours } from "date-fns";
import { useCalendarStore } from "../../hooks";

export const FabAddNew = () => {
  const { setActiveEvent, setNewEventState } = useCalendarStore();

  const handleClickNew = () => {
    setActiveEvent({
      title: "",
      notes: "",
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: "#fafafa",
      user: {
        _id: "123",
        name: "Mariano",
      },
    });
    setNewEventState();
  };

  return (
    <button
      onClick={handleClickNew}
      className="btn fab"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
    >
      <i className="fas fa-plus"></i>
    </button>
  );
};

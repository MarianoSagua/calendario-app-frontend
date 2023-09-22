export const CalendarEvent = ({ event }) => {
  const { title, user } = event;

  return (
    <div data-bs-toggle="modal" data-bs-target="#exampleModal">
      <strong>{title}</strong>
      <span>- {user.name}</span>
    </div>
  );
};

export const Loader = () => {
  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#0062cc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="spinner-border text-light" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

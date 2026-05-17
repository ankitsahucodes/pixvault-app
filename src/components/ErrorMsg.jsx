function ErrorMsg({ error }) {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "50vh" }}
    >
      <p className="text-danger fs-4">{error}</p>
    </div>
  );
}

export default ErrorMsg;

const ReviewContainer = (props) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        margin: "10px",
        borderRadius: "5px",
        overflowWrap: "break-word",
      }}
    >
      <h2>{props.attraction_name}</h2>
      <p style={{ color: "#f5a623" }}>
        Rating: {"★".repeat(props.rating)}
        {"☆".repeat(5 - props.rating)}
      </p>
      <p>Review Content: {props.review}</p>
      <small>Date created: {props.date_created}</small>
    </div>
  );
};

export default ReviewContainer;

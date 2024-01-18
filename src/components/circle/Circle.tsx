import "./circle.scss";

const Circle = ({
  title,
  value,
  unVal,
  bgColor,
}: {
  title: string;
  value: string;
  unVal: string;
  bgColor: string;
}) => {
  return (
    <div
      className="zooming-circle"
      style={{
        width: "170px",
        height: "170px",
        borderRadius: "50%",
        backgroundColor: bgColor,
        margin: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        borderWidth: "10px",
        borderStyle: "solid",
        borderColor:
          title == "Item Count" || title == "Battery Percentage"
            ? parseFloat(unVal) < 20
              ? "red"
              : "#3076e6"
            : "#3076e6",
      }}
    >
      {/* <img src={icon} alt="" /> */}
      <p
        className="circle-text"
        style={{ color: "#000000", fontSize: "0.8rem" }}
      >
        {title}
      </p>
      <p
        className="circle-value"
        style={{
          color: "#000000",
          marginTop: "10px",
          fontSize: "1.5rem",
        }}
      >
        {value}
      </p>
    </div>
  );
};
export default Circle;

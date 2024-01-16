import "./chartBox.scss";

const ChartBox = ({
  title,
  count,
  icon,
}: {
  title: string;
  count: number;
  icon: string;
}) => {
  return (
    <div className="chartBox">
      <div className="boxInfo">
        <div className="title" style={{ width: "100%" }}>
          <img src={icon} alt="" style={{ width: "60px" }} />
          <span>{title}</span>
        </div>
        <h1 style={{ fontSize: "2.5rem" }}>{count ? count : "00"}</h1>
        {/* <Link to="/" style={{ color: props.color }}>
          View all
        </Link> */}
      </div>
    </div>
  );
};

export default ChartBox;

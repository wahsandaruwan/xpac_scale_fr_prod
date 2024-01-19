import Circle from "../circle/Circle";

const SummaryCard = ({
  id,
  deviceTitle,
  itemCount,
  batteryPercentage,
}: {
  id: any;
  deviceTitle: any;
  itemCount: any;
  batteryPercentage: any;
}) => {
  console.log("batteryPercentage");
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#918f8f",
        borderRadius: "10px",
      }}
    >
      <p style={{ fontSize: "0.8 rem", color: "#000000", marginBottom: "5px" }}>
        ID : {id}
      </p>
      <p style={{ fontSize: "0.8 rem", color: "#000000" }}>
        Device Title : {deviceTitle}
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Circle
          title="Item Count"
          value={
            itemCount < 10 ? "0" + itemCount.toString() : itemCount.toString()
          }
          unVal={itemCount.toString()}
          bgColor="#f78f5e"
          icon="/items1.svg"
        />
        <Circle
          title="Battery Percentage"
          value={
            batteryPercentage < 10
              ? "0" + batteryPercentage.toString() + "%"
              : batteryPercentage.toString() + "%"
          }
          unVal={batteryPercentage.toString()}
          bgColor="#5e99f7"
          icon="/battery1.svg"
        />
      </div>
    </div>
  );
};
export default SummaryCard;

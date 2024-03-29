import CircularProgressBar from "../CircularProgressBar/CircularProgressBar";
import { useTheme } from "../../contexts/ThemeContext";

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
  const { themeColors } = useTheme();
  console.log("batteryPercentage");
  return (
    <div
      style={{
        padding: "15px",
        backgroundColor: "transparent",
        border: `solid 2px ${themeColors.mainColor}`,
        borderRadius: "10px",
      }}
    >
      <p
        style={{
          fontSize: "0.65 rem",
          marginBottom: "5px",
          color: themeColors.mainColor,
        }}
      >
        ID : {id}
      </p>
      <p style={{ fontSize: "0.65 rem", color: themeColors.mainColor }}>
        Device Title : {deviceTitle}
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgressBar
          CurrentValue={parseFloat(itemCount)}
          StartValue={0}
          EndValue={100}
          LowValue={20}
          HighValue={80}
          Units={""}
          InnerColor={"#f78f5e"}
          TextColor={"#000000"}
          Icon={"/items1.svg"}
          Title={"Item Count"}
        />
        <CircularProgressBar
          CurrentValue={parseFloat(batteryPercentage)}
          StartValue={0}
          EndValue={100}
          LowValue={20}
          HighValue={80}
          Units={"%"}
          InnerColor={"#5e99f7"}
          TextColor={"#000000"}
          Icon={"/battery1.svg"}
          Title={"Battery Percentage"}
        />
      </div>
    </div>
  );
};
export default SummaryCard;

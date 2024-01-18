const Circle = () => {
  return (
    <div
      style={{
        width: "200px",
        height: "200px",
        borderRadius: "50%",
        backgroundColor: "#f78f5e",
        margin: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <p style={{ color: "#000000" }}>Item Count</p>
      <p
        style={{
          color: "#000000",
          marginTop: "10px",
          fontSize: "2rem",
        }}
      >
        {/* {deviceRecentData[0].deviceData.itemCount < 10
          ? "0" + deviceRecentData[0].deviceData.itemCount
          : deviceRecentData[0].deviceData.itemCount} */}
      </p>
    </div>
  );
};
export default Circle;

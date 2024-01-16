import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./singleDevice.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const SingleDevice = ({ deviceRecentData }: { deviceRecentData: any }) => {
  // Users data
  const [ChartData, SetChartData] = useState([]);

  // Chart type
  const [ChartType, SetChartType] = useState("monthly");

  const handleChange = (event: SelectChangeEvent) => {
    SetChartType(event.target.value as string);
  };

  useEffect(() => {
    fetchChartData();

    const intervalId = setInterval(() => {
      fetchChartData();
    }, 600000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    fetchChartData();
  }, [ChartType]);

  const params = useParams();
  console.log(params);

  console.log("first");

  // Fetch device count data
  const fetchChartData = async () => {
    const headers = {
      token: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTllNDc5Zjc5ODg5NGJkM2JlYTFmZTciLCJ1c2VyVHlwZSI6ImFkbWluIiwiaWF0IjoxNzA1MzA1ODI1LCJleHAiOjE3MDUzOTIyMjV9.I5DMKbG54idiqm_IP8nEf7XqJCK3QkUWKZTjuh3jOg4`,
    };

    try {
      const response = await axios.get(
        "http://104.245.34.253:3300/api/device/all/" +
          params.id +
          "?period=" +
          ChartType,
        { headers }
      );
      console.log("first");
      console.log(response.data.weighingDeviceData[0].deviceData);
      SetChartData(response.data.weighingDeviceData[0].deviceData);
    } catch (error) {
      // Handle errors here
      console.error("Error fetching data:", error);
    }
  };

  function separateDateAndTime(dateTimeString: any) {
    let dateTime = new Date(dateTimeString);

    if (isNaN(dateTime.getTime())) {
      // Handle invalid date-time string
      return null;
    }

    let date = dateTime.toISOString().split("T")[0];
    let time = dateTime.toISOString().split("T")[1].split(".")[0];

    return {
      date: date,
      time: time,
    };
  }

  return (
    <div className="single">
      {deviceRecentData.length > 0 ? (
        <div className="view">
          <div className="info">
            <div className="topInfo">
              <img src="/scale.svg" alt="" />
              <h1>{deviceRecentData[0].title}</h1>
              {/* <button>Update</button> */}
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <div className="details">
                <div className="item">
                  <span className="itemTitle">ID : </span>
                  <span className="itemValue">{deviceRecentData[0]._id}</span>
                </div>
                {/* <div className="item">
                <span className="itemTitle">Assigned Item : </span>
                <span className="itemValue">
                  {deviceRecentData[0].assignedItem}
                </span>
              </div> */}
                <div className="item">
                  <span className="itemTitle">User Id : </span>
                  <span className="itemValue">
                    {deviceRecentData[0].userId}
                  </span>
                </div>
                <div className="item">
                  <span className="itemTitle">Created Date : </span>
                  <span className="itemValue">
                    {separateDateAndTime(deviceRecentData[0].createdAt)?.date}
                  </span>
                </div>
                <div className="item">
                  <span className="itemTitle">Created Time : </span>
                  <span className="itemValue">
                    {separateDateAndTime(deviceRecentData[0].createdAt)?.time}
                  </span>
                </div>
                <div className="item">
                  <span className="itemTitle">Updated Date : </span>
                  <span className="itemValue">
                    {separateDateAndTime(deviceRecentData[0].updatedAt)?.date}
                  </span>
                </div>
                <div className="item">
                  <span className="itemTitle">Updated Time : </span>
                  <span className="itemValue">
                    {separateDateAndTime(deviceRecentData[0].updatedAt)?.time}
                  </span>
                </div>
              </div>
              <div
                style={{
                  marginLeft: "50px",
                  display: "flex",
                  alignItems: "flex-start",
                }}
              >
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
                    {deviceRecentData[0].deviceData.itemCount < 10
                      ? "0" + deviceRecentData[0].deviceData.itemCount
                      : deviceRecentData[0].deviceData.itemCount}
                  </p>
                </div>
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                    backgroundColor: "#f0f75e",
                    margin: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <p style={{ color: "#000000" }}>Total Weight</p>
                  <p
                    style={{
                      color: "#000000",
                      marginTop: "10px",
                      fontSize: "2rem",
                    }}
                  >
                    {deviceRecentData[0].deviceData.totalWeight < 10
                      ? "0" + deviceRecentData[0].deviceData.totalWeight + "g"
                      : deviceRecentData[0].deviceData.totalWeight + "g"}
                  </p>
                </div>
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                    backgroundColor: "#5e99f7",
                    margin: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <p style={{ color: "#000000" }}>Battery Percentage</p>
                  <p
                    style={{
                      color: "#000000",
                      marginTop: "10px",
                      fontSize: "2rem",
                    }}
                  >
                    {deviceRecentData[0].deviceData.batteryPercentage < 10
                      ? "0" +
                        deviceRecentData[0].deviceData.batteryPercentage +
                        "%"
                      : deviceRecentData[0].deviceData.batteryPercentage + "%"}
                  </p>
                </div>
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                    backgroundColor: "#b583f2",
                    margin: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <p style={{ color: "#000000" }}>Battery Voltage</p>
                  <p
                    style={{
                      color: "#000000",
                      marginTop: "10px",
                      fontSize: "2rem",
                    }}
                  >
                    {deviceRecentData[0].deviceData.batteryVoltage % 1 === 0
                      ? deviceRecentData[0].deviceData.batteryVoltage + ".0"
                      : deviceRecentData[0].deviceData.batteryVoltage.toString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <FormControl style={{ width: "200px" }}>
            <InputLabel id="demo-simple-select-label">Chart Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={ChartType}
              label="Chart Type"
              onChange={handleChange}
            >
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="daily">Daily</MenuItem>
            </Select>
          </FormControl>
          {ChartData.length > 0 && (
            <div className="chart">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  width={500}
                  height={300}
                  data={ChartData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <XAxis />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="itemCount" stroke="black" />
                  <Line
                    type="monotone"
                    dataKey="batteryPercentage"
                    stroke="orange"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      ) : (
        <p>No Data Available...</p>
      )}
      {/* <div className="activities">
        <h2>Latest Activities</h2>
        {props.activities && (
          <ul>
            {props.activities.map((activity) => (
              <li key={activity.text}>
                <div>
                  <p>{activity.text}</p>
                  <time>{activity.time}</time>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div> */}
    </div>
  );
};

export default SingleDevice;

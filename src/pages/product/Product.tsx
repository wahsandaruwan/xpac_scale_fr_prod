import SingleDevice from "../../components/SingleDevice/SingleDevice";
import "./product.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Product = () => {
  // Users data
  const [DeviceRecentData, SetDeviceRecentData] = useState([]);

  useEffect(() => {
    fetchDeviceRecentData();

    const intervalId = setInterval(() => {
      fetchDeviceRecentData();
    }, 600000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  const params = useParams();
  console.log(params);

  console.log("first");

  // Fetch device count data
  const fetchDeviceRecentData = async () => {
    const headers = {
      token: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTllNDc5Zjc5ODg5NGJkM2JlYTFmZTciLCJ1c2VyVHlwZSI6ImFkbWluIiwiaWF0IjoxNzA1MzA1ODI1LCJleHAiOjE3MDUzOTIyMjV9.I5DMKbG54idiqm_IP8nEf7XqJCK3QkUWKZTjuh3jOg4`,
    };

    try {
      const response = await axios.get(
        "http://104.245.34.253:3300/api/device/one/" + params.id,
        { headers }
      );
      console.log("first");
      console.log(response.data.weighingDeviceData);
      SetDeviceRecentData(response.data.weighingDeviceData);
    } catch (error) {
      // Handle errors here
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="product">
      <SingleDevice deviceRecentData={DeviceRecentData} />
    </div>
  );
};

export default Product;

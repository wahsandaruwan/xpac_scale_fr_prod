import SingleDevice from "../../components/SingleDevice/SingleDevice";
import "./product.scss";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Product = () => {
  // Users data
  const [DeviceRecentData, SetDeviceRecentData] = useState([]);

  const params = useParams();
  console.log(params);

  let navigate = useNavigate();

  useEffect(() => {
    const storedUserString = localStorage.getItem("user");
    if (storedUserString) {
      const storedUser = JSON.parse(storedUserString);
      console.log(storedUser);
      navigate("/products/" + params.id);
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    fetchDeviceRecentData();

    const intervalId = setInterval(() => {
      fetchDeviceRecentData();
    }, 600000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  console.log("first");

  // Fetch device count data
  const fetchDeviceRecentData = async () => {
    const storedUserString = localStorage.getItem("user");
    if (storedUserString) {
      const storedUser = JSON.parse(storedUserString);
      const headers = {
        token: `Bearer ${storedUser.accessToken}`,
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
    }
  };

  return (
    <div className="product">
      <SingleDevice deviceRecentData={DeviceRecentData} />
    </div>
  );
};

export default Product;

import Single from "../../components/single/Single";
import "./user.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const User = () => {
  // Users data
  const [UserData, SetUserData] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const params = useParams();
  console.log(params);

  // Fetch device count data
  const fetchUsers = async () => {
    const headers = {
      token: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTllNDc5Zjc5ODg5NGJkM2JlYTFmZTciLCJ1c2VyVHlwZSI6ImFkbWluIiwiaWF0IjoxNzA1MzA1ODI1LCJleHAiOjE3MDUzOTIyMjV9.I5DMKbG54idiqm_IP8nEf7XqJCK3QkUWKZTjuh3jOg4`,
    };

    try {
      const response = await axios.get(
        "http://104.245.34.253:3300/api/users/one/" + params.id,
        { headers }
      );
      console.log(response.data.user);
      SetUserData(response.data.user);
    } catch (error) {
      // Handle errors here
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="user">
      <Single userData={UserData} />
    </div>
  );
};

export default User;

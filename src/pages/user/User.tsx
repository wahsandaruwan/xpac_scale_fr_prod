import Single from "../../components/single/Single";
import "./user.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const User = () => {
  // Users data
  const [UserData, SetUserData] = useState({});

  const params = useParams();
  console.log(params);

  let navigate = useNavigate();

  useEffect(() => {
    const storedUserString = localStorage.getItem("user");
    if (storedUserString) {
      const storedUser = JSON.parse(storedUserString);
      console.log(storedUser);
      navigate("/users/" + params.id);
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch device count data
  const fetchUsers = async () => {
    const storedUserString = localStorage.getItem("user");
    if (storedUserString) {
      const storedUser = JSON.parse(storedUserString);
      const headers = {
        token: `Bearer ${storedUser.accessToken}`,
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
    }
  };

  return (
    <div className="user">
      <Single userData={UserData} />
    </div>
  );
};

export default User;

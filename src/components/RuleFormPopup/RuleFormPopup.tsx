// UserFormPopup.tsx

import { useState, useEffect } from "react";
import "./ruleForm.scss"; // Import the SCSS file
import axios from "axios";

interface RuleFormPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

interface RuleFormState {
  userId: string;
  deviceId: string;
  emailStatus: string;
}

const RuleFormPopup: React.FC<RuleFormPopupProps> = ({ isOpen, onClose }) => {
  const [InputData, SetInputData] = useState<RuleFormState>({
    userId: "none",
    deviceId: "none",
    emailStatus: "none",
  });
  const [UsersData, SetUsersData] = useState<any[]>([]);
  const [DevicesData, SetDevicesData] = useState<any[]>([]);

  console.log(UsersData);
  console.log(DevicesData);

  useEffect(() => {
    fetchUsers();
    fetchDevices();
  }, []);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    // Use the spread operator to copy the existing state
    SetInputData({
      ...InputData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const storedUserString = localStorage.getItem("user");
    if (storedUserString) {
      const storedUser = JSON.parse(storedUserString);
      const headers = {
        token: `Bearer ${storedUser.accessToken}`,
      };
      if (
        InputData.userId == "none" ||
        InputData.deviceId == "none" ||
        InputData.emailStatus == "none"
      ) {
        alert("Please provide valid information for all fields.");
        return;
      }
      try {
        const response = await axios.post(
          "http://104.245.34.253:3300/api/rules/create/",
          InputData,
          { headers }
        );
        if (response.data.status) {
          SetInputData({
            userId: "none",
            deviceId: "none",
            emailStatus: "none",
          });
          alert(response.data.success.message);
          onClose();
        } else {
          alert(response.data.error.message);
        }
      } catch (error: any) {
        alert(error.response.data.error.message);
        console.error("Error fetching data:", error);
      }
    }
  };

  // Fetch Users
  const fetchUsers = async () => {
    const storedUserString = localStorage.getItem("user");
    if (storedUserString) {
      const storedUser = JSON.parse(storedUserString);
      const headers = {
        token: `Bearer ${storedUser.accessToken}`,
      };

      try {
        const response = await axios.get(
          "http://104.245.34.253:3300/api/users/all/nonadmin",
          { headers }
        );
        console.log(response.data.nonAdminUsers);
        SetUsersData(response.data.nonAdminUsers);
      } catch (error) {
        // Handle errors here
        console.error("Error fetching data:", error);
      }
    }
  };

  // Fetch devices
  const fetchDevices = async () => {
    const storedUserString = localStorage.getItem("user");
    if (storedUserString) {
      const storedUser = JSON.parse(storedUserString);
      const headers = {
        token: `Bearer ${storedUser.accessToken}`,
      };

      try {
        const response = await axios.get(
          "http://104.245.34.253:3300/api/device/all",
          { headers }
        );
        console.log(response.data.devices);
        SetDevicesData(response.data.devices);
      } catch (error) {
        // Handle errors here
        console.error("Error fetching data:", error);
      }
    }
  };

  return (
    <div className={`popup-container ${isOpen ? "open" : "closed"}`}>
      <div className="popup-content">
        <h2 className="heading">Add a Rule</h2>
        <form onSubmit={handleSubmit}>
          <select
            name="userId"
            value={InputData.userId}
            onChange={handleInputChange}
            className="form-input"
          >
            <option value="none" disabled>
              User
            </option>
            {UsersData.length > 0
              ? UsersData.map((item, index) => (
                  <option value={item._id} key={Date.now() + index}>
                    {item.fullName}
                  </option>
                ))
              : null}
          </select>
          <br />
          <select
            name="deviceId"
            value={InputData.deviceId}
            onChange={handleInputChange}
            className="form-input"
          >
            <option value="none" disabled>
              Device
            </option>
            {DevicesData.length > 0
              ? DevicesData.map((item, index) => (
                  <option value={item._id} key={Date.now() + index}>
                    {item.title}
                  </option>
                ))
              : null}
          </select>
          <br />
          <select
            name="emailStatus"
            value={InputData.emailStatus}
            onChange={handleInputChange}
            className="form-input"
          >
            <option value="none" disabled>
              Send Email
            </option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          {/* <div>
            <p>Users</p>
            <div>
              <div>
                <div>659e479f798894bd3bea1fe7</div>
                <div>Kamal Perera</div>
                <div>Yes</div>
              </div>
            </div>
          </div> */}
          <button type="submit" className="form-button">
            Save
          </button>
          <button
            type="button"
            onClick={() => {
              SetInputData({
                userId: "none",
                deviceId: "none",
                emailStatus: "none",
              });
            }}
            className="form-button"
          >
            Clear
          </button>
          <button type="button" onClick={onClose} className="form-button">
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default RuleFormPopup;
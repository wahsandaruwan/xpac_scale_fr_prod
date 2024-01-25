// UserFormPopup.tsx

import { useState } from "react";
import "./deviceForm.scss"; // Import the SCSS file
import axios from "axios";

interface DeviceFormPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DeviceFormState {
  title: string;
  imageUrl: string;
  assignedItem: string;
  dateCreated: string;
  timeCreated: string;
  dateUpdated: string;
  timeUpdated: string;
}

const DeviceFormPopup: React.FC<DeviceFormPopupProps> = ({
  isOpen,
  onClose,
}) => {
  const [InputData, SetInputData] = useState<DeviceFormState>({
    title: "",
    imageUrl: "1",
    assignedItem: "659e479f798894bd3bea1fe7",
    dateCreated: "2023-01-22",
    timeCreated: "16:08",
    dateUpdated: "2023-01-22",
    timeUpdated: "16:08",
  });

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
      if (!InputData.title) {
        alert("Please provide valid information for all fields.");
        return;
      }
      try {
        const response = await axios.post(
          "http://104.245.34.253:3300/api/device/add-device/",
          InputData,
          { headers }
        );
        if (response.data.status) {
          SetInputData({
            title: "",
            imageUrl: "1",
            assignedItem: "659e479f798894bd3bea1fe7",
            dateCreated: "2023-01-22",
            timeCreated: "16:08",
            dateUpdated: "2023-01-22",
            timeUpdated: "16:08",
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

  return (
    <div className={`popup-container ${isOpen ? "open" : "closed"}`}>
      <div className="popup-content">
        <h2 className="heading">Add a Device</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={InputData.title}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Device Title"
          />
          {/* <br />
          <div className="user-select">
            <select
              name="id"
              value={UserData.id}
              onChange={handleInputChange}
              className="form-input"
            >
              <option value="none" disabled>
                User
              </option>
              <option value="customer">Customer</option>
              <option value="moderator">Moderator</option>
              <option value="admin">Admin</option>
            </select>
            <select
              name="status"
              value={UserData.status}
              onChange={handleInputChange}
              className="form-input"
            >
              <option value="none" disabled>
                Send Email
              </option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            <button type="button" className="form-button">
              Add
            </button>
          </div>
          <br /> */}
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
                title: "",
                imageUrl: "1",
                assignedItem: "659e479f798894bd3bea1fe7",
                dateCreated: "2023-01-22",
                timeCreated: "16:08",
                dateUpdated: "2023-01-22",
                timeUpdated: "16:08",
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

export default DeviceFormPopup;

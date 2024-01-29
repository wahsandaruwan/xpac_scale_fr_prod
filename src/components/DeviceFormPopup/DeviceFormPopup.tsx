// UserFormPopup.tsx

import { useState, useEffect } from "react";
import "./deviceForm.scss"; // Import the SCSS file
import axios from "axios";
import { useParams } from "react-router-dom";

interface DeviceFormPopupProps {
  isOpen: boolean;
  update: boolean;
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
  update,
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

  const params = useParams();
  console.log(params);
  // console.log(InputData);

  useEffect(() => {
    if (update) {
      getDevice();
    }
  }, [params, isOpen]);

  useEffect(() => {
    getDevice();
    const storedUserString = localStorage.getItem("user");
    if (storedUserString) {
      const storedUser = JSON.parse(storedUserString);
      SetUserType(storedUser.userType);
    }
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
    if (!update) {
      addDevice();
    } else {
      updateDevice();
    }
  };

  const addDevice = async () => {
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

  const updateDevice = async () => {
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
        const response = await axios.put(
          "http://104.245.34.253:3300/api/device/update-device/" + params.id,
          { title: InputData.title },
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
        // Handle errors here
        console.error("Error fetching data:", error);
      }
    }
  };

  const getDevice = async () => {
    const storedUserString = localStorage.getItem("user");
    if (storedUserString) {
      const storedUser = JSON.parse(storedUserString);
      const headers = {
        token: `Bearer ${storedUser.accessToken}`,
      };

      try {
        const response = await axios.get(
          "http://104.245.34.253:3300/api/device/item_details/one/" + params.id,
          { headers }
        );
        if (response.data.status) {
          console.log(response.data.weighingDeviceData[0].title);
          SetInputData({
            title: response.data.weighingDeviceData[0].title,
            imageUrl: "1",
            assignedItem: "659e479f798894bd3bea1fe7",
            dateCreated: "2023-01-22",
            timeCreated: "16:08",
            dateUpdated: "2023-01-22",
            timeUpdated: "16:08",
          });
        } else {
          console.error(response.data.error.message);
        }
      } catch (error) {
        // Handle errors here
        console.error("Error fetching data:", error);
      }
    }
  };

  return (
    <div className={`popup-container ${isOpen ? "open" : "closed"}`}>
      <div className="popup-content">
        <h2 className="heading">
          {!update ? "Add a Device" : "Update a Device"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={InputData.title}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Device Title"
          />

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

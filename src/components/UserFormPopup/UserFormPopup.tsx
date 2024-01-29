// UserFormPopup.tsx

import { useState, useEffect } from "react";
import "./userForm.scss"; // Import the SCSS file
import axios from "axios";
import { useParams } from "react-router-dom";

interface UserFormPopupProps {
  isOpen: boolean;
  update: boolean;
  onClose: () => void;
}

interface UserFormState {
  fullName: string;
  emailAddress: string;
  password: string;
  phoneNumber: string;
  userType: string;
  adminChange: boolean;
}

const UserFormPopup: React.FC<UserFormPopupProps> = ({
  isOpen,
  update,
  onClose,
}) => {
  const [InputData, SetInputData] = useState<UserFormState>({
    fullName: "",
    emailAddress: "",
    password: "",
    phoneNumber: "",
    userType: "none",
    adminChange: false,
  });

  const [UserType, SetUserType] = useState("");

  const params = useParams();
  console.log(params);
  console.log(InputData);

  useEffect(() => {
    if (update) {
      getUser();
    }
  }, [params, isOpen]);

  useEffect(() => {
    getUser();
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
      addUser();
    } else {
      updateUser();
    }
  };

  const addUser = async () => {
    const storedUserString = localStorage.getItem("user");
    if (storedUserString) {
      const storedUser = JSON.parse(storedUserString);
      const headers = {
        token: `Bearer ${storedUser.accessToken}`,
      };
      if (
        !InputData.fullName ||
        !InputData.emailAddress ||
        !InputData.password ||
        !InputData.phoneNumber ||
        InputData.userType === "none"
      ) {
        alert("Please provide valid information for all fields.");
        return;
      }
      try {
        const response = await axios.post(
          "http://104.245.34.253:3300/api/users/register",
          InputData,
          { headers }
        );
        if (response.data.status) {
          SetInputData({
            fullName: "",
            emailAddress: "",
            password: "",
            phoneNumber: "",
            userType: "none",
            adminChange: false,
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

  const updateUser = async () => {
    const storedUserString = localStorage.getItem("user");
    if (storedUserString) {
      const storedUser = JSON.parse(storedUserString);
      const headers = {
        token: `Bearer ${storedUser.accessToken}`,
      };
      if (
        !InputData.fullName ||
        !InputData.emailAddress ||
        !InputData.password ||
        !InputData.phoneNumber ||
        InputData.userType === "none"
      ) {
        alert("Please provide valid information for all fields.");
        return;
      }
      try {
        const response = await axios.put(
          "http://104.245.34.253:3300/api/users/update/secure/" + params.id,
          InputData,
          { headers }
        );
        if (response.data.status) {
          SetInputData({
            fullName: "",
            emailAddress: "",
            password: "",
            phoneNumber: "",
            userType: "none",
            adminChange: false,
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

  const getUser = async () => {
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
        if (response.data.status) {
          SetInputData({
            fullName: response.data.user.fullName,
            emailAddress: response.data.user.emailAddress,
            password: "",
            phoneNumber: response.data.user.phoneNumber,
            userType: response.data.user.userType,
            adminChange: UserType == "admin",
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
        <h2 className="heading">{!update ? "Add User" : "Update User"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            value={InputData.fullName}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Full Name"
          />
          <br />
          <input
            type="email"
            name="emailAddress"
            value={InputData.emailAddress}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Email Address"
          />
          <br />
          <input
            type="password"
            name="password"
            value={InputData.password}
            onChange={handleInputChange}
            className="form-input"
            placeholder={!update ? "Password" : "New or Old Password"}
          />
          <br />
          <input
            type="number"
            name="phoneNumber"
            value={InputData.phoneNumber}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Phone Number"
          />
          <br />
          {UserType == "admin" ? (
            <select
              name="userType"
              value={InputData.userType}
              onChange={handleInputChange}
              className="form-input"
            >
              <option value="none" disabled>
                User Type
              </option>
              <option value="customer">Customer</option>
              <option value="moderator">Moderator</option>
              <option value="admin">Admin</option>
            </select>
          ) : null}

          <br />
          <button type="submit" className="form-button">
            Save
          </button>
          <button
            type="button"
            onClick={() =>
              SetInputData({
                fullName: "",
                emailAddress: "",
                password: "",
                phoneNumber: "",
                userType: "none",
                adminChange: false,
              })
            }
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

export default UserFormPopup;

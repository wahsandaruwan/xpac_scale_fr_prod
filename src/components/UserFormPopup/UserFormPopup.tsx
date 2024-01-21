// UserFormPopup.tsx

import { useState } from "react";
import "./userForm.scss"; // Import the SCSS file
import axios from "axios";

interface UserFormPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UserFormState {
  fullName: string;
  emailAddress: string;
  password: string;
  phoneNumber: string;
  userType: string;
}

const UserFormPopup: React.FC<UserFormPopupProps> = ({ isOpen, onClose }) => {
  const [InputData, SetInputData] = useState<UserFormState>({
    fullName: "",
    emailAddress: "",
    password: "",
    phoneNumber: "",
    userType: "none",
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
      if (!InputData.fullName) {
        alert("Please provide a valid full name.");
        return;
      }
      if (!InputData.emailAddress) {
        alert("Please provide a valid email address.");
        return;
      }
      if (!InputData.password) {
        alert("Please provide a valid password.");
        return;
      }
      if (!InputData.phoneNumber) {
        alert("Please provide a valid password.");
        return;
      }
      if (InputData.userType == "none") {
        alert("Please provide a valid user type.");
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
          });
          alert("Successfully created a new user!");
          onClose();
        } else {
          alert("Failed to create a new user, please check your inputs!");
        }
      } catch (error) {
        alert("Failed to create a new user due to server error!");
        // Handle errors here
        console.error("Error fetching data:", error);
      }
    }
  };

  return (
    <div className={`popup-container ${isOpen ? "open" : "closed"}`}>
      <div className="popup-content">
        <h2 className="heading">Add a User</h2>
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
            placeholder="Password"
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

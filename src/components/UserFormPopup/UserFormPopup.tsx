// UserFormPopup.tsx

import { useState } from "react";
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
  });

  const params = useParams();
  console.log(params);

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

  // const getUser = async () => {
  //   const storedUserString = localStorage.getItem("user");
  //   if (storedUserString) {
  //     const storedUser = JSON.parse(storedUserString);
  //     const headers = {
  //       token: `Bearer ${storedUser.accessToken}`,
  //     };
  //     if (
  //       !InputData.fullName ||
  //       !InputData.emailAddress ||
  //       !InputData.password ||
  //       !InputData.phoneNumber ||
  //       InputData.userType === "none"
  //     ) {
  //       alert("Please provide valid information for all fields.");
  //       return;
  //     }
  //     try {
  //       const response = await axios.post(
  //         "http://104.245.34.253:3300/api/users/one/" + params.id,
  //         InputData,
  //         { headers }
  //       );
  //       if (response.data.status) {
  //         SetInputData({
  //           fullName: "",
  //           emailAddress: "",
  //           password: "",
  //           phoneNumber: "",
  //           userType: "none",
  //         });
  //         alert("Successfully created a new user!");
  //         onClose();
  //       } else {
  //         alert("Failed to create a new user, please check your inputs!");
  //       }
  //     } catch (error) {
  //       alert("Failed to create a new user due to server error!");
  //       // Handle errors here
  //       console.error("Error fetching data:", error);
  //     }
  //   }
  // };

  return (
    <div className={`popup-container ${isOpen ? "open" : "closed"}`}>
      <div className="popup-content">
        <h2 className="heading">{!update ? "Add a User" : "Update User"}</h2>
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

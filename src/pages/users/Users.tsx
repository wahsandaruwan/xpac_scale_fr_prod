import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./users.scss";
import { useState, useEffect } from "react";
import Add from "../../components/add/Add";
import axios from "axios";
// import { useQuery } from "@tanstack/react-query";

const columns: GridColDef[] = [
  {
    field: "_id",
    type: "string",
    headerName: "ID",
    flex: 1,
  },
  {
    field: "img",
    headerName: "Avatar",
    flex: 1,
    renderCell: (params) => {
      return <img src={params.row.img || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "fullName",
    type: "string",
    headerName: "Full Name",
    flex: 1,
  },
  {
    field: "emailAddress",
    type: "string",
    headerName: "Email Address",
    flex: 1,
  },
  {
    field: "phoneNumber",
    type: "string",
    headerName: "Phone Number",
    flex: 1,
  },
  {
    field: "userType",
    type: "string",
    headerName: "User Type",
    flex: 1,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    flex: 1,
    type: "string",
  },
  {
    field: "updatedAt",
    headerName: "Updated At",
    flex: 1,
    type: "string",
  },
];

const Users = () => {
  const [open, setOpen] = useState(false);

  // Users data
  const [UsersData, SetUsersData] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch device count data
  const fetchUsers = async () => {
    const headers = {
      token: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTllNDc5Zjc5ODg5NGJkM2JlYTFmZTciLCJ1c2VyVHlwZSI6ImFkbWluIiwiaWF0IjoxNzA1Mzk0Mjg5LCJleHAiOjE3MDU0ODA2ODl9.Lnp_qM-h0tTZxwqA3FKZcOdRcXNNntibs5d8T6cRKAg`,
    };

    try {
      const response = await axios.get(
        "http://104.245.34.253:3300/api/users/all",
        { headers }
      );
      console.log(response.data.customers);
      SetUsersData(response.data.customers);
    } catch (error) {
      // Handle errors here
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="users">
      <div className="info">
        <h1>All Customers</h1>
        {/* <button onClick={() => setOpen(true)}>Add New User</button> */}
      </div>
      {UsersData.length > 0 ? (
        <DataTable slug="users" columns={columns} rows={UsersData} />
      ) : (
        <p>No Data Available...</p>
      )}
      {/* TEST THE API */}

      {/* {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="users" columns={columns} rows={data} />
      )} */}
      {open && <Add slug="user" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Users;

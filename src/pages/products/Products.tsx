import { useState, useEffect } from "react";
import "./products.scss";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import { GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const columns: GridColDef[] = [
  { field: "_id", headerName: "ID", flex: 1 },
  {
    field: "img",
    headerName: "Image",
    flex: 1,
    renderCell: (params) => {
      return <img src={params.row.img || "/scaless.svg"} alt="" />;
    },
  },
  {
    field: "title",
    type: "string",
    headerName: "Title",
    flex: 1,
  },
  {
    field: "assignedItem",
    type: "string",
    headerName: "Assigned Item",
    flex: 1,
  },
  {
    field: "userId",
    type: "string",
    headerName: "User Id",
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

const popupColumns: GridColDef[] = [
  {
    field: "title",
    type: "string",
    headerName: "Title",
    flex: 1,
  },
  {
    field: "userId",
    type: "string",
    headerName: "Customer ID",
    flex: 1,
  },
];

const Products = () => {
  const [open, setOpen] = useState(false);

  // Devices data
  const [DevicesData, SetDevicesData] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    const storedUserString = localStorage.getItem("user");
    if (storedUserString) {
      const storedUser = JSON.parse(storedUserString);
      console.log(storedUser);
      navigate("/products");
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    fetchDevices();
  }, []);

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
    <div className="products">
      <div className="info">
        <h1>All Devices</h1>
        <button onClick={() => setOpen(true)}>Add New Device</button>
      </div>
      {DevicesData.length > 0 ? (
        <DataTable slug="products" columns={columns} rows={DevicesData} />
      ) : (
        <p>No Data Available...</p>
      )}

      {/* TEST THE API */}

      {/* {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="products" columns={columns} rows={data} />
      )} */}
      {open && <Add slug="Device" columns={popupColumns} setOpen={setOpen} />}
    </div>
  );
};

export default Products;

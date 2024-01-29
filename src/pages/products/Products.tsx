import { useState, useEffect } from "react";
import "./products.scss";
import DataTable from "../../components/dataTable/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeviceFormPopup from "../../components/DeviceFormPopup/DeviceFormPopup";

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

const Products = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [UserType, SetUserType] = useState("");

  // Devices data
  const [DevicesData, SetDevicesData] = useState([]);

  // Status
  const [Status, SetStatus] = useState("none");

  let navigate = useNavigate();

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

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

    const storedUserString = localStorage.getItem("user");
    if (storedUserString) {
      const storedUser = JSON.parse(storedUserString);
      SetUserType(storedUser.userType);
    }
  }, []);

  useEffect(() => {
    fetchDevices();
  }, [isFormOpen, Status]);

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

  const updateStatus = (val: string) => {
    SetStatus(val);
  };

  return (
    <div className="products">
      <div className="info">
        <h1>All Devices</h1>
        {UserType == "admin" ? (
          <button onClick={openForm}>Add New Device</button>
        ) : null}
      </div>
      {DevicesData.length > 0 ? (
        <DataTable
          slug="products"
          statusChange={updateStatus}
          columns={columns}
          rows={DevicesData}
        />
      ) : (
        <p>No Data Available...</p>
      )}

      {/* TEST THE API */}

      {/* {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="products" columns={columns} rows={data} />
      )} */}
      <DeviceFormPopup isOpen={isFormOpen} update={false} onClose={closeForm} />
    </div>
  );
};

export default Products;

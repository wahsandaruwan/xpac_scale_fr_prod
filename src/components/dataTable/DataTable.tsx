import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import "./dataTable.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  columns: GridColDef[];
  rows: object[];
  slug: string;
  statusChange: (val: string) => void;
};

const DataTable = (props: Props) => {
  const [UserType, SetUserType] = useState("");

  useEffect(() => {
    const storedUserString = localStorage.getItem("user");
    if (storedUserString) {
      const storedUser = JSON.parse(storedUserString);
      SetUserType(storedUser.userType);
    }
  }, []);
  // TEST THE API

  // const queryClient = useQueryClient();
  // // const mutation = useMutation({
  // //   mutationFn: (id: number) => {
  // //     return fetch(`http://localhost:8800/api/${props.slug}/${id}`, {
  // //       method: "delete",
  // //     });
  // //   },
  // //   onSuccess: ()=>{
  // //     queryClient.invalidateQueries([`all${props.slug}`]);
  // //   }
  // // });

  const handleDelete = async (id: any) => {
    const userConfirmed = window.confirm("Do you want to proceed?");

    if (userConfirmed) {
      if (props.slug == "rules") {
        const storedUserString = localStorage.getItem("user");
        if (storedUserString) {
          const storedUser = JSON.parse(storedUserString);
          const headers = {
            token: `Bearer ${storedUser.accessToken}`,
          };

          try {
            const response = await axios.delete(
              "http://104.245.34.253:3300/api/rules/delete/" + id,
              { headers }
            );

            if (response.data.status) {
              alert(response.data.success.message);
              props.statusChange("delete");
            } else {
              alert(response.data.error.message);
            }
          } catch (error) {
            // Handle errors here
            console.error("Error fetching data:", error);
          }
        }
      } else if (props.slug == "products") {
        const storedUserString = localStorage.getItem("user");
        if (storedUserString) {
          const storedUser = JSON.parse(storedUserString);
          const headers = {
            token: `Bearer ${storedUser.accessToken}`,
          };

          try {
            const response = await axios.delete(
              "http://104.245.34.253:3300/api/device/delete-device/" + id,
              { headers }
            );

            if (response.data.status) {
              alert(response.data.success.message);
              props.statusChange("delete");
            } else {
              alert(response.data.error.message);
            }
          } catch (error) {
            // Handle errors here
            console.error("Error fetching data:", error);
          }
        }
      } else if (props.slug == "users") {
        const storedUserString = localStorage.getItem("user");
        if (storedUserString) {
          const storedUser = JSON.parse(storedUserString);
          const headers = {
            token: `Bearer ${storedUser.accessToken}`,
          };

          try {
            const response = await axios.delete(
              "http://104.245.34.253:3300/api/users/delete/" + id,
              { headers }
            );

            if (response.data.status) {
              alert(response.data.success.message);
              props.statusChange("delete");
            } else {
              alert(response.data.error.message);
            }
          } catch (error) {
            // Handle errors here
            console.error("Error fetching data:", error);
          }
        }
      }
    }
  };

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    flex: 1,
    renderCell: (params) => {
      return (
        <div className="action">
          <Link to={`/${props.slug}/${params.row._id}`}>
            <img src="/vieweye.svg" alt="" />
          </Link>
          {UserType == "admin" ? (
            <div
              className="delete"
              onClick={() => handleDelete(params.row._id)}
            >
              <img src="/delete.svg" alt="" />
            </div>
          ) : null}
        </div>
      );
    },
  };

  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={props.rows}
        getRowId={(row) => row._id}
        columns={[...props.columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
          filter: {
            filterModel: {
              items: [],
              quickFilterValues: [""],
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
            printOptions: { disableToolbarButton: true },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableDensitySelector
        style={{ minHeight: "500px" }}
      />
    </div>
  );
};

export default DataTable;

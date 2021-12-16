import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import dayjs from "dayjs";
import { Button, Snackbar } from "@mui/material";

function Traininglist() {
  const [trainings, setTrainings] = useState([]);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((response) => response.json())
      .then((data) => setTrainings(data))
      .catch((err) => console.error(err));
  };

  const deleteTraining = (params) => {
    if (window.confirm("Are you sure?")) {
      fetch(
        "https://customerrest.herokuapp.com/api/trainings/" + params.data.id,
        { method: "DELETE" }
      )
        .then((response) => {
          if (response.ok) {
            fetchTrainings();
            setMsg("Training deleted successfully");
            setOpen(true);
          } else {
            alert("Something went wrong with deleting the training");
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const columns = [
    {
      headerName: "Date and time",
      valueGetter: (params) => {
        return dayjs(params.data.date).format("DD/MM/YYYY HH:mm");
      },
      sortable: true,
      filter: true,
    },
    {
      headerName: "Duration (min)",
      field: "duration",
      sortable: true,
      filter: true,
    },
    {
      field: "activity",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Customer",
      valueGetter: (params) => {
        return (
          params.data.customer.firstname + " " + params.data.customer.lastname
        );
      },
      sortable: true,
      filter: true,
    },
    {
      headerName: "",
      field: "links.0.href",
      width: 120,
      cellRendererFramework: (params) => (
        <Button
          size="small"
          color="error"
          onClick={() => deleteTraining(params)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <React.Fragment>
      <div
        className="ag-theme-material"
        style={{ height: 600, margin: "auto" }}
      >
        <AgGridReact
          rowData={trainings}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={10}
          suppressCellSelection={true}
        />
      </div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message={msg}
      />
    </React.Fragment>
  );
}

export default Traininglist;

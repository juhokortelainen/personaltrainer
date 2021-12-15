import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import Button from "@mui/material/Button";
import Snackbar from '@mui/material/Snackbar';
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

function Customerlist() {
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data.content))
      .catch((err) => console.error(err));
  };

  const addCustomer = (customer) => {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(customer),
    })
    .then(response => {
        if (response.ok) {
            fetchCustomers();
        }
        else {
            alert("Something went wrong with adding a new customer")
        }
    })
    .catch(err => console.error(err))
  };

  const updateCustomer = (url, updatedCustomer) => {
    fetch(url, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(updatedCustomer)
    })
    .then(response => {
      if (response.ok) {
        fetchCustomers();
        setMsg("Customer updated successfully");
        setOpen(true);
      }
      else {
        alert("Something went wrong with updating the customer")
      }
    })
    .catch(err => console.error(err))
  }

  const addTraining = (training) => {
    fetch("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(training)
    })
    .then(response => {
        if (response.ok) {
            fetchCustomers();
        }
        else {
            alert("Something went wrong with adding the training")
        }
    })
    .catch(err => console.error(err))
  };

  const deleteCustomer = (url) => {
    if (window.confirm("Are you sure?")) {
      fetch(url, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            fetchCustomers();
            setMsg("Customer deleted successfully");
            setOpen(true);
          } else {
            alert("Something went wrong with deleting the customer");
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const columns = [
    {
      field: "firstname",
      sortable: true,
      filter: true,
      width: 140,
    },
    {
      field: "lastname",
      sortable: true,
      filter: true,
      width: 140,
    },
    {
      field: "streetaddress",
      sortable: true,
      filter: true,
      width: 170
    },
    {
      field: "postcode",
      sortable: true,
      filter: true,
      width: 130,
    },
    {
      field: "city",
      sortable: true,
      filter: true,
      width: 120,
    },
    {
      field: "email",
      sortable: true,
      filter: true,
      width: 180
    },
    {
      field: "phone",
      sortable: true,
      filter: true,
      width: 140
    },
    {
      headerName: "",
      field: "links.0.href",
      width: 180,
      cellRendererFramework: params => <AddTraining addTraining={addTraining} customer={params} />
    },
    {
      headerName: "",
      field: "links.0.href",
      width: 120,
      cellRendererFramework: params => <EditCustomer updateCustomer={updateCustomer} customer={params}/>
    },
    {
      headerName: "",
      field: "links.0.href",
      width: 120,
      cellRendererFramework: (params) => (
        <Button
          size="small"
          color="error"
          onClick={() => deleteCustomer(params.value)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <React.Fragment>
      <AddCustomer addCustomer={addCustomer} />
      <div
        className="ag-theme-material"
        style={{ height: 600, margin: "auto" }}
      >
        <AgGridReact
          rowData={customers}
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

export default Customerlist;

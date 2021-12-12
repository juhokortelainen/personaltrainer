import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import Button from "@mui/material/Button";
import AddCustomer from "./AddCustomer";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

function Customerlist() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data.content))
      .catch((err) => console.error(err));
  };

  const deleteCustomer = (url) => {
    if (window.confirm("Are you sure?")) {
      fetch(url, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            fetchCustomers();
          } else {
            alert("Jokin meni vikaan");
          }
        })
        .catch((err) => console.error(err));
    }
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
            alert("Jokin meni vikaan lisäyksessä")
        }
    })
    .catch(err => console.error(err))
  };

  const columns = [
    {
      field: "firstname",
      sortable: true,
      filter: true,
      width: 150,
    },
    {
      field: "lastname",
      sortable: true,
      filter: true,
      width: 150,
    },
    {
      field: "streetaddress",
      sortable: true,
      filter: true,
    },
    {
      field: "postcode",
      sortable: true,
      filter: true,
      width: 140,
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
    },
    {
      field: "phone",
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
        style={{ height: 600, width: "80%", margin: "auto" }}
      >
        <AgGridReact
          rowData={customers}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={10}
          suppressCellSelection={true}
        />
      </div>
    </React.Fragment>
  );
}

export default Customerlist;

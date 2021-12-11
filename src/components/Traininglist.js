import React, { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import dayjs from "dayjs";

function Traininglist() {

    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        fetch("https://customerrest.herokuapp.com/api/trainings")
        .then(response => response.json())
        .then(data => setTrainings(data.content))
        .catch(err => console.error(err))
    }, [])

    const columns = [
        {
            headerName: "Date and time",
            field: "date",
            valueGetter: params => { return dayjs(params.data.date).format("DD/MM/YYYY HH:mm"); },
            sortable:true,
            filter: true
        },
        {
            headerName: "Duration (min)",
            field: "duration",
            sortable:true,
            filter: true
        },
        {
            field: "activity",
            sortable:true,
            filter: true
        }
    ];

    return(
        <div className="ag-theme-material" style={{height: 600, width: "80%", margin: "auto"}}>
            <AgGridReact
                rowData={trainings}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={10}
            />
        </div>
    );
}

export default Traininglist;
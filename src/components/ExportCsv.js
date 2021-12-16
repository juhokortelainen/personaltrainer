import React from "react";
import Button from "@mui/material/Button";

function ExportCsv(props) {
  const { exportCsv } = props;

  return (
    <div>
      <Button variant="outlined" onClick={exportCsv}>
        Export customers
      </Button>
    </div>
  );
}

export default ExportCsv;

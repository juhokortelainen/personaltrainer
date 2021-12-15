import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import "./App.css";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Customerlist from "./components/Customerlist";
import Traininglist from "./components/Traininglist";

function App() {
  const [value, setValue] = useState("customers");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Personal Trainer
          </Typography>
        </Toolbar>
      </AppBar>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange}>
            <Tab label="Customers" value="customers" />
            <Tab label="Trainings" value="trainings" />
          </TabList>
        </Box>
        <TabPanel value="customers">
          <Customerlist />
        </TabPanel>
        <TabPanel value="trainings">
          <Traininglist />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default App;

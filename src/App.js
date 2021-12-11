import './App.css';
import React, { useState } from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';


function App() {

  const [value, setValue] = React.useState('customers');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            <Tab label="Customers" value="customers" />
            <Tab label="Trainings" value="trainings" />
          </TabList>
        </Box>
        <TabPanel value="customers"><Customerlist /></TabPanel>
        <TabPanel value="trainings"><Traininglist /></TabPanel>
      </TabContext>
    </Box>
  );
}

export default App;

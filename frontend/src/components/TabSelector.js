// src/components/TabSelector.js
import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
} from '@mui/material';
import Portfolio from './Portfolio';
// import ArtCard from './ArtCard';
import BasicCard from './ArtCard';

const TabContent = ({ value }) => {
  switch (value) {
    case 0:
      return <Portfolio  />
    case 1:
      return <Typography>Gallery</Typography>;;
    case 2: 
      return <Typography>Gallery</Typography>; 

  }
};

const TabSelector = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          centered
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTabs-indicator': {
              backgroundColor: 'purple',
            },
            '& .MuiTab-root': {
              color: 'text.primary',
              '&.Mui-selected': {
                color: 'purple',
              },
            },
          }}
        >
          <Tab label="Portfolio" />
          <Tab label="Favorites" />
          <Tab label="Gallery" />

        </Tabs>
      <Box sx={{ p: 3 }}>
        <TabContent value={value} />
      </Box>
    </Box>
  );
};

export default TabSelector;

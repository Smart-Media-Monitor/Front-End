// Front-End/src/layouts/dashboard/components/Summary/index.js

import React, { useState, useEffect } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';

const Summary = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    // Add your logic here for handling the selected option change
  }, [selectedOption]);

  return (
    <SoftBox display="flex" flexDirection="column" alignItems="left" justifyContent="centre" p={2}>
      <SoftTypography variant="body2" color="text" fontWeight="medium" mb={1} textAlign="centre">
        Summary
      </SoftTypography>
      <Select
        value={selectedOption}
        onChange={handleOptionChange}
        displayEmpty
        sx={{ width: 200 }}
      >
        <MenuItem value="">Select an option</MenuItem>
        <MenuItem value="Offensive">Offensive</MenuItem>
        <MenuItem value="Informational">Informational</MenuItem>
        <MenuItem value="Positive Feedback">Positive Feedback</MenuItem>
        <MenuItem value="Negative Feedback">Negative Feedback</MenuItem>
        <MenuItem value="Suggestions">Suggestions</MenuItem>
        <MenuItem value="Cross-References">Cross-References</MenuItem>
      </Select>
    </SoftBox>
  );
};

export default Summary;

import React, { useState, useEffect } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import CircularProgress from '@mui/material/CircularProgress';

const Summary = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const fetchSummaries = async (type) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://127.0.0.1:8000/summaries?label=${type}`);
      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      setError('Error fetching summaries');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedOption) {
      fetchSummaries(selectedOption);
    }
  }, [selectedOption]);

  return (
    <SoftBox display="flex" flexDirection="column" alignItems="left" justifyContent="center" p={2}>
      <SoftTypography variant="h5" fontWeight="bold">
        Summary Generator 
      </SoftTypography>
      <Select
        value={selectedOption}
        onChange={handleOptionChange}
        displayEmpty
        sx={{ width: 200 }}
        aria-label="Select summary type"
      >
        <MenuItem value="">Select an option</MenuItem>
        <MenuItem value="Offensive">Offensive</MenuItem>
        <MenuItem value="Informational">Informational</MenuItem>
        <MenuItem value="Positive Feedback">Positive Feedback</MenuItem>
        <MenuItem value="Negative Feedback">Negative Feedback</MenuItem>
        <MenuItem value="Suggestions">Suggestions</MenuItem>
        <MenuItem value="Cross-References">Cross-References</MenuItem>
      </Select>
      {isLoading ? (
        <CircularProgress />
      ) : error ? (
        <SoftTypography variant="body2" color="error">
          {error}
        </SoftTypography>
      ) : summary === '' ? (
        <SoftTypography variant="body2" color="text">
          Please select a category
        </SoftTypography>
      ) : (
        summary.split('\n').map((line, index) => (
          <SoftTypography key={index} variant="body2" color="text">
            {line}
          </SoftTypography>
        ))
      )}
    </SoftBox>
  );
};

export default Summary;

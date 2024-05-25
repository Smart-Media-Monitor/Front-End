import React, { useState } from 'react';
import { Card, TextField, Button, Icon, InputAdornment } from '@mui/material';
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';

const ScriptGenerator = () => {
  const [topic, setTopic] = useState('');
  const [script, setScript] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateScript = async () => {
    if (topic.trim()) {
      setIsLoading(true);
      try {
        // Make API call
        const response = await fetch(`http://127.0.0.1:8000/script/?topic=${topic}`);
        const data = await response.json();
        setScript(data.response);
      } catch (error) {
        console.error('Error generating script:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Card sx={{ height: "100%", p: 2 }}>
      <SoftBox display="flex" flexDirection="column" height="100%">
        <SoftBox mb={3}>
          <SoftTypography variant="h5" fontWeight="bold">
            Script Generator
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={3}>
          <TextField
            placeholder="Enter Any Topic"
            variant="outlined"
            fullWidth
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            InputLabelProps={{
              style: {
                textAlign: 'left',
                left: '12px',
                transform: 'translateY(10px)',
              },
            }}
            InputProps={{
              style: {
                color: 'black',
              },
              startAdornment: (
                <InputAdornment position="start">
                  <SoftTypography
                    variant="body2"
                    sx={{
                      color: topic ? 'transparent' : 'text.secondary',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    Topic
                  </SoftTypography>
                </InputAdornment>
              ),
            }}
            sx={{ backgroundColor: 'white', borderRadius: 1 }}
          />
        </SoftBox>
        <SoftBox display="flex" justifyContent="center" mb={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGenerateScript}
            disabled={isLoading}
            endIcon={<Icon>send</Icon>}
          >
            {isLoading ? 'Generating...' : 'Generate Script'}
          </Button>
        </SoftBox>
        {script && (
          <SoftBox p={2} sx={{ backgroundColor: 'rgba(0, 0, 0, 0.05)', borderRadius: 1 }}>
            <SoftTypography variant="body1" color="textPrimary">
              {script}
            </SoftTypography>
          </SoftBox>
        )}
      </SoftBox>
    </Card>
  );
};

export default ScriptGenerator;

import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ReactWordcloud from 'react-wordcloud';

function BuildByDevelopers() {
  const [selectedOption, setSelectedOption] = useState('');
  const [comments, setComments] = useState([]);
  const [wordCloudData, setWordCloudData] = useState([]);

  const fetchComments = async (commentType) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/comments/?label=${commentType}`);
      const data = await response.json();
      setComments(data);
      console.log('API response:', data);

      // Generate word cloud data from fetched comments
      const words = data.reduce((acc, comment) => {
        const commentWords = comment.comment.split(' ');
        commentWords.forEach((word) => {
          const formattedWord = word.toLowerCase().replace(/[^a-zA-Z]/g, '');
          if (formattedWord) {
            if (acc[formattedWord]) {
              acc[formattedWord].value += 1;
            } else {
              acc[formattedWord] = { text: formattedWord, value: 1 };
            }
          }
        });
        return acc;
      }, {});
      setWordCloudData(Object.values(words));
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };
  
    useEffect(() => {
      if (selectedOption) {
        fetchComments(selectedOption);
        console.log('Fetching comments for:', selectedOption);
      }
    }, [selectedOption]);
  
  const filteredComments = comments.slice(0, 5);

  return (
    <Card>
      <SoftBox p={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <SoftBox display="flex" flexDirection="column" height="100%">
              <SoftBox pt={1} mb={0.5}>
              <SoftTypography variant="h5" fontWeight="bold">
                Sentiment Analysis 
              </SoftTypography>
              </SoftBox>
              <SoftBox mb={2}>
                <Select
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  displayEmpty
                  sx={{ width: 200 }}
                >
                  <MenuItem value="">Select an option</MenuItem>
                  <MenuItem value="Offensive">Offensive</MenuItem>
                  <MenuItem value="Informational">Informational</MenuItem>
                  <MenuItem value="Positive Feedback">Positive Feedback</MenuItem>
                  <MenuItem value="Negative Feedback">Negative Feedback</MenuItem>
                  <MenuItem value="Suggestions">Suggestions</MenuItem>
                  <MenuItem value="Questions">Questions</MenuItem>
                  <MenuItem value="Cross-References">Cross-References</MenuItem>
                  <MenuItem value="Requests">Requests</MenuItem>
                </Select>
              </SoftBox>
              {selectedOption ? (
                <List>
                  {filteredComments.map((comment, index) => (
                    <ListItem key={comment.id}>
                      <SoftTypography variant="body2">{`${index + 1}. ${comment.comment}`}</SoftTypography>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <SoftTypography variant="body2" color="text" align="center">
                  Please select a category
                </SoftTypography>
              )}
            </SoftBox>
          </Grid>
          <Grid item xs={12} lg={6}>
          <SoftTypography variant="h5" fontWeight="bold">
                Word Cloud
              </SoftTypography>
            <SoftBox display="flex" justifyContent="center" alignItems="center" height="400px">
              {selectedOption ? (
                <ReactWordcloud
                  words={wordCloudData}
                  options={{
                    rotations: 2,
                    rotationAngles: [-90, 0],
                    fontFamily: 'Roboto', // Optional: change the font family
                    fontSizes: [20, 60], // Optional: change the range of font sizes
                    scale: 'log', // Optional: adjust the scaling of the word frequencies
                    spiral: 'archimedean', // Optional: choose the spiral type
                  }}
                />
              ) : (
                <SoftTypography variant="body2" color="text" align="center">
                  Please select a category to see the word cloud
                </SoftTypography>
              )}
            </SoftBox>
          </Grid>
        </Grid>
      </SoftBox>
    </Card>
  );
}

export default BuildByDevelopers;

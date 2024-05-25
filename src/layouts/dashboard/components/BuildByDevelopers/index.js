import React from 'react';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ReactWordcloud from 'react-wordcloud';

const stopwords = ['a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t', 'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can\'t', 'cannot', 'could', 'couldn\'t', 'did', 'didn\'t', 'do', 'does', 'doesn\'t', 'doing', 'don\'t', 'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had', 'hadn\'t', 'has', 'hasn\'t', 'have', 'haven\'t', 'having', 'he', 'he\'d', 'he\'ll', 'he\'s', 'her', 'here', 'here\'s', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'how\'s', 'i', 'i\'d', 'i\'ll', 'i\'m', 'i\'ve', 'if', 'in', 'into', 'is', 'isn\'t', 'it', 'it\'s', 'its', 'itself', 'let\'s', 'me', 'more', 'most', 'mustn\'t', 'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'shan\'t', 'she', 'she\'d', 'she\'ll', 'she\'s', 'should', 'shouldn\'t', 'so', 'some', 'such', 'than', 'that', 'that\'s', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'there\'s', 'these', 'they', 'they\'d', 'they\'ll', 'they\'re', 'they\'ve', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'wasn\'t', 'we', 'we\'d', 'we\'ll', 'we\'re', 'we\'ve', 'were', 'weren\'t', 'what', 'what\'s', 'when', 'when\'s', 'where', 'where\'s', 'which', 'while', 'who', 'who\'s', 'whom', 'why', 'why\'s', 'with', 'won\'t', 'would', 'wouldn\'t', 'you', 'you\'d', 'you\'ll', 'you\'re', 'you\'ve', 'your', 'yours', 'yourself', 'yourselves'];

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
          if (formattedWord && !stopwords.includes(formattedWord)) { // Check if the word is not a stopword
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
                {/* <SoftTypography variant="body2" color="text" fontWeight="medium">
                  Labeled Comments
                </SoftTypography> */}
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
              <List>
                {filteredComments.map((comment, index) => (
                  <ListItem key={comment.id}>
                    <SoftTypography variant="body2">{`${index + 1}. ${comment.comment}`}</SoftTypography>
                  </ListItem>
                ))}
              </List>
            </SoftBox>
          </Grid>
          <Grid item xs={12} lg={6}>
            <SoftBox display="flex" justifyContent="center" alignItems="center" height="400px">
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
            </SoftBox>
          </Grid>
        </Grid>
      </SoftBox>
    </Card>
  );
}

export default BuildByDevelopers;


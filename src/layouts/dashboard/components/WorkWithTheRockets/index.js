import React, { useState, useEffect } from 'react';
import { Card, Icon, InputBase, Button, Avatar } from '@mui/material';
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';

function WorkWithTheRockets() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingDots, setTypingDots] = useState('');

  const handleSendMessage = async () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
      setIsTyping(true);
      setTypingDots(''); // Reset typing dots

      try {
        // Make API call
        const response = await fetch(`http://127.0.0.1:8000/query/?query=${input}`);
        const data = await response.json();
        setMessages(prevMessages => [...prevMessages, { text: data.response, sender: 'bot' }]);
      } catch (error) {
        console.error('Error sending message:', error);
      } finally {
        setIsTyping(false);
      }
    }
  };

  // Function to simulate typing animation
  const simulateTyping = () => {
    const dots = '.';
    setTypingDots(prevDots => (prevDots.length >= 3 ? '' : prevDots + dots));
    setTimeout(simulateTyping, 500);
  };

  // Start typing animation when the bot is processing a response
  useEffect(() => {
    if (isTyping) {
      simulateTyping();
    }
  }, [isTyping]);

  return (
    <Card sx={{ height: "100%", borderRadius: 2}}>
      <SoftBox position="relative" height="100%" p={2}>
        <SoftBox
          display="flex"
          flexDirection="column"
          height="100%"
          py={2}
          px={2}
          borderRadius="lg"
          sx={{
            backgroundColor: "#f0f0f0", // Light gray background
          }}
        >
          <SoftBox mb={3} pt={1}>
             <SoftTypography variant="h5" fontWeight="bold">
                Interactive QnA with your Data!
              </SoftTypography>
          </SoftBox>
          <SoftBox mb={2} height="60%" overflow="auto" display="flex" flexDirection="column" sx={{ backgroundColor: 'white', borderRadius: '10px', p: 2 }}>
            {messages.map((message, index) => (
              <SoftBox
                key={index}
                display="flex"
                justifyContent={message.sender === 'user' ? 'flex-end' : 'flex-start'}
                mb={1}
              >
                {message.sender === 'bot' && (
                  <Avatar sx={{ mr: 1, bgcolor: '#0084ff', color: 'white' }}>
                    <Icon>bot</Icon>
                  </Avatar>
                )}
                <SoftBox
                  px={2}
                  py={1}
                  borderRadius="10px"
                  sx={{
                    backgroundColor: message.sender === 'user' ? '#0084ff' : '#f0f0f0',
                    color: message.sender === 'user' ? 'white' : 'text.primary',
                  }}
                >
                  <SoftTypography variant="body2">
                    {message.text}
                  </SoftTypography>
                </SoftBox>
                {message.sender === 'user' && (
                  <Avatar sx={{ ml: 1, bgcolor: '#0084ff', color: 'white' }}>
                    <Icon>person</Icon>
                  </Avatar>
                )}
              </SoftBox>
            ))}
            {isTyping && (
              <SoftBox display="flex" justifyContent="flex-start" alignItems="center">
                <Avatar sx={{ mr: 1, bgcolor: '#0084ff', color: 'white' }}>
                  <Icon>bot</Icon>
                </Avatar>
                <SoftTypography variant="body2">
                  Typing{typingDots}
                </SoftTypography>
              </SoftBox>
            )}
          </SoftBox>
          <SoftBox mt="auto" display="flex" alignItems="center" sx={{ backgroundColor: '#e0e0e0', borderRadius: '10px', p: 1 }}>
            <InputBase
              placeholder="Talk to your data!"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              sx={{ ml: 1, flex: 1, color: 'text.primary' }}
            />
            <Button
              onClick={handleSendMessage}
              sx={{ ml: 1, color: 'text.primary', minWidth: 'auto' }}
            >
              <Icon>send</Icon>
            </Button>
          </SoftBox>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

export default WorkWithTheRockets;

import React, { useState, useRef, useEffect } from 'react';
import { Box, Fab, Drawer, IconButton, Typography, TextField, Button } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

const PopupChat = ({ messages, onSendMessage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <>
      <Fab
        color="primary"
        aria-label="chat"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={handleToggle}
      >
        <ChatIcon />
      </Fab>
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={handleToggle}
        PaperProps={{ sx: { width: '300px' } }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e0e0e0' }}>
            <Typography variant="h6">Chat</Typography>
            <IconButton onClick={handleToggle}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
            {messages.map((msg, index) => (
              <Box key={index} sx={{ mb: 1, textAlign: msg.sender === 'You' ? 'right' : 'left' }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{msg.sender}</Typography>
                <Typography variant="body1" sx={{ 
                  backgroundColor: msg.sender === 'You' ? '#e3f2fd' : '#f5f5f5',
                  p: 1,
                  borderRadius: '8px',
                  display: 'inline-block',
                  maxWidth: '80%'
                }}>{msg.text}</Typography>
              </Box>
            ))}
            <div ref={messagesEndRef} />
          </Box>
          <Box sx={{ p: 2, borderTop: '1px solid #e0e0e0', display: 'flex' }}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
            />
            <Button onClick={handleSend} sx={{ ml: 1 }}>
              <SendIcon />
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default PopupChat;
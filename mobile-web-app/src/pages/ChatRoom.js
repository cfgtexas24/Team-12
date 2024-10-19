import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  AppBar, 
  Toolbar, 
  Typography, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar,
  Avatar,
  IconButton, 
  TextField, 
  Button,
  Grid,
  Paper
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VideocamIcon from '@mui/icons-material/Videocam';
import CallEndIcon from '@mui/icons-material/CallEnd';

const ChatRoom = () => {
  const [channels, setChannels] = useState(['General', 'Mentors', 'Local Area']);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [messages, setMessages] = useState({
    General: [],
    Mentors: [],
    'Local Area': []
  });
  const [newMessage, setNewMessage] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isInVideoCall, setIsInVideoCall] = useState(false);
  const messagesEndRef = useRef(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const [localStream, setLocalStream] = useState(null);

  // Mock data for mentors and friends
  const contacts = [
    { id: 1, name: 'Mentor Sarah', type: 'mentor', avatar: '/api/placeholder/40/40' },
    { id: 2, name: 'Friend John', type: 'friend', avatar: '/api/placeholder/40/40' },
    { id: 3, name: 'Mentor Mike', type: 'mentor', avatar: '/api/placeholder/40/40' },
    { id: 4, name: 'Friend Emma', type: 'friend', avatar: '/api/placeholder/40/40' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    if (isInVideoCall) {
      initializeWebRTC();
    } else {
      cleanupWebRTC();
    }
  }, [isInVideoCall]);

  const initializeWebRTC = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      const pc = new RTCPeerConnection();
      setPeerConnection(pc);

      stream.getTracks().forEach(track => pc.addTrack(track, stream));

      pc.ontrack = (event) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          // Send the candidate to the remote peer
          // You'll need to implement signaling here
        }
      };

      // Create and send an offer
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      // Send the offer to the remote peer
      // You'll need to implement signaling here

    } catch (error) {
      console.error("Error initializing WebRTC:", error);
    }
  };

  const cleanupWebRTC = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    if (peerConnection) {
      peerConnection.close();
    }
    setLocalStream(null);
    setPeerConnection(null);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '' && selectedChannel) {
      setMessages(prevMessages => ({
        ...prevMessages,
        [selectedChannel]: [...prevMessages[selectedChannel], { text: newMessage, sender: 'You' }]
      }));
      setNewMessage('');
    }
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleContactClick = (contact) => {
    // For now, just navigate to the General channel
    setSelectedChannel('General');
  };

  const startVideoCall = () => {
    setIsInVideoCall(true);
  };

  const endVideoCall = () => {
    setIsInVideoCall(false);
  };

  const renderLandingPage = () => (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Your Connections</Typography>
      <Grid container spacing={2}>
        {contacts.map((contact) => (
          <Grid item xs={6} key={contact.id}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 2, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                cursor: 'pointer',
                '&:hover': { backgroundColor: '#f0f0f0' }
              }}
              onClick={() => handleContactClick(contact)}
            >
              <Avatar src={contact.avatar} sx={{ width: 60, height: 60, mb: 1 }} />
              <Typography variant="subtitle1">{contact.name}</Typography>
              <Typography variant="body2" color="textSecondary">{contact.type}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Button 
        fullWidth 
        variant="contained" 
        sx={{ mt: 2, backgroundColor: '#8e44ad', '&:hover': { backgroundColor: '#732d91' } }}
        onClick={() => setSelectedChannel('General')}
      >
        Enter General Chat
      </Button>
    </Box>
  );

  const renderChatRoom = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 112px)' }}>
      {isInVideoCall && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, backgroundColor: '#000', height: '50%' }}>
          <video ref={localVideoRef} autoPlay muted style={{ width: '48%', height: '100%', objectFit: 'cover' }} />
          <video ref={remoteVideoRef} autoPlay style={{ width: '48%', height: '100%', objectFit: 'cover' }} />
        </Box>
      )}
      <Box sx={{ 
        flexGrow: 1, 
        overflow: 'auto', 
        p: 2, 
        backgroundColor: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {messages[selectedChannel].map((msg, index) => (
          <Box key={index} sx={{ mb: 1, p: 1, backgroundColor: '#fff', borderRadius: 1, alignSelf: msg.sender === 'You' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>{msg.sender}</Typography>
            <Typography variant="body1">{msg.text}</Typography>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      <Box sx={{ 
        p: 2, 
        backgroundColor: '#fff', 
        borderTop: '1px solid #e0e0e0',
        display: 'flex',
        alignItems: 'center'
      }}>
        <TextField
          fullWidth
          variant="outlined"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          sx={{ mr: 1 }}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <Button 
          variant="contained" 
          onClick={handleSendMessage}
          sx={{ 
            backgroundColor: '#8e44ad', 
            '&:hover': { backgroundColor: '#732d91' },
            mr: 1
          }}
        >
          <SendIcon />
        </Button>
        <Button
          variant="contained"
          color={isInVideoCall ? "error" : "primary"}
          onClick={isInVideoCall ? endVideoCall : startVideoCall}
          sx={{ minWidth: 'auto' }}
        >
          {isInVideoCall ? <CallEndIcon /> : <VideocamIcon />}
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ 
      flexGrow: 1, 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
    }}>
      <AppBar position="static" sx={{ backgroundColor: '#f1c40f' }}>
  <Toolbar sx={{ justifyContent: 'center', position: 'relative' }}>
    {selectedChannel ? (
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="back"
        sx={{ position: 'absolute', left: 16 }}
        onClick={() => setSelectedChannel(null)}
      >
        <ArrowBackIcon />
      </IconButton>
    ) : (
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ position: 'absolute', left: 16 }}
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
    )}
    <Typography variant="h6" component="div" sx={{ color: '#000' }}>
      {selectedChannel || 'Chat Home'}
    </Typography>
  </Toolbar>
</AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {channels.map((channel) => (
              <ListItem button key={channel} onClick={() => setSelectedChannel(channel)}>
                <ListItemText primary={channel} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {selectedChannel ? renderChatRoom() : renderLandingPage()}
    </Box>
  );
};

export default ChatRoom;
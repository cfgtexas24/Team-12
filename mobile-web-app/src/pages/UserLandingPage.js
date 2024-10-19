import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon,
  IconButton,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import { 
  Event as EventIcon, 
  Phone as PhoneIcon, 
  Email as EmailIcon,
  Edit as EditIcon,
  Settings as SettingsIcon // Import Settings Icon
} from '@mui/icons-material';

const UserLandingPage = () => {
  const navigate = useNavigate();
  const [mentorName, setMentorName] = useState("Sarah Johnson");
  const [totalPoints, setTotalPoints] = useState(300);
  const [displayedPoints, setDisplayedPoints] = useState(0); // For animation
  const [events, setEvents] = useState([
    { date: "2024-10-18", title: "Meeting with Mentor" },
    { date: "2024-10-20", title: "Community Volunteering" },
    { date: "2024-10-25", title: "Career Workshop" },
  ]);
  const [quickContacts, setQuickContacts] = useState([
    { name: "Emergency Hotline", contact: "911" },
    { name: "Mentor", contact: "mentor@example.com" },
    { name: "Support Group", contact: "1-800-SUPPORT" },
  ]);

  // Profile Settings Dialog State
  const [openProfileSettingsDialog, setOpenProfileSettingsDialog] = useState(false);
  const [email, setEmail] = useState("mentor@example.com");
  const [location, setLocation] = useState("New York");

  // Edit Contacts Dialog State
  const [openEditContactsDialog, setOpenEditContactsDialog] = useState(false);
  const [editedContacts, setEditedContacts] = useState(quickContacts);

  const handleOpenProfileSettingsDialog = () => {
    setOpenProfileSettingsDialog(true);
  };

  const handleCloseProfileSettingsDialog = () => {
    setOpenProfileSettingsDialog(false);
    // Reset the form fields if needed
  };

  const handleSaveProfileSettings = () => {
    // Save the email and location to the user data here
    handleCloseProfileSettingsDialog();
  };

  const handleEditContacts = () => {
    setOpenEditContactsDialog(true);
  };

  const handleCloseEditContactsDialog = () => {
    setOpenEditContactsDialog(false);
  };

  const handleSaveEditedContacts = () => {
    setQuickContacts(editedContacts);
    handleCloseEditContactsDialog();
  };

  const handleContactChange = (index, field, value) => {
    const updatedContacts = [...editedContacts];
    updatedContacts[index][field] = value;
    setEditedContacts(updatedContacts);
  };

  // Animate the points value
  useEffect(() => {
    let start = 0;
    const end = totalPoints;
    if (start === end) return;

    let incrementTime = 10; // in ms, change this to adjust speed
    const step = Math.ceil(end / 100);

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setDisplayedPoints(start);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [totalPoints]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <IconButton onClick={handleOpenProfileSettingsDialog} size="small">
          <SettingsIcon /> {/* Settings Icon for Profile */}
        </IconButton>
      </Box>
      <Grid container spacing={3}>
        {/* Dashboard */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              My Dashboard
            </Typography>
            <Typography component="p" variant="h4">
              Welcome back!
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              Your Mentor: {mentorName}
            </Typography>
            <Typography component="p" variant="h4">
              Total Points: {displayedPoints}
            </Typography>
          </Paper>
        </Grid>
        
        {/* Events */}
        <Grid item xs={12} md={6} lg={8}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Upcoming Events
            </Typography>
            <List sx={{ overflow: 'auto' }}>
              {events.map((event, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <EventIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary={event.title} 
                    secondary={new Date(event.date).toLocaleDateString()} 
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        
        {/* Quick Contacts */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Quick Contacts
              </Typography>
              <IconButton onClick={handleEditContacts} size="small">
                <EditIcon />
              </IconButton>
            </Box>
            <Grid container spacing={2}>
              {quickContacts.map((contact, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Paper elevation={3} sx={{ p: 2 }}>
                    <Typography variant="h6">{contact.name}</Typography>
                    <Box display="flex" alignItems="center">
                      {contact.contact.includes('@') ? (
                        <EmailIcon sx={{ mr: 1 }} />
                      ) : (
                        <PhoneIcon sx={{ mr: 1 }} />
                      )}
                      <Typography>{contact.contact}</Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
            <Box display="flex" justifyContent="center" mt={2}>
              <Button variant="contained" color="primary" sx={{ mr: 2 }} onClick={() => navigate('/mentorapply')}>
                Apply to be a Mentor
              </Button>
              <Button variant="contained" color="secondary" onClick={() => navigate('/menteeapply')}>
                Be a Mentee
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Profile Settings Dialog */}
      <Dialog open={openProfileSettingsDialog} onClose={handleCloseProfileSettingsDialog}>
        <DialogTitle>Edit Profile Settings</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Location"
            type="text"
            fullWidth
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          {/* Add more fields as necessary */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseProfileSettingsDialog} color="primary">Cancel</Button>
          <Button onClick={handleSaveProfileSettings} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Contacts Dialog */}
      <Dialog open={openEditContactsDialog} onClose={handleCloseEditContactsDialog}>
        <DialogTitle>Edit Quick Contacts</DialogTitle>
        <DialogContent>
          {editedContacts.map((contact, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <TextField
                margin="dense"
                label="Contact Name"
                type="text"
                fullWidth
                value={contact.name}
                onChange={(e) => handleContactChange(index, 'name', e.target.value)}
              />
              <TextField
                margin="dense"
                label="Contact Info"
                type="text"
                fullWidth
                value={contact.contact}
                onChange={(e) => handleContactChange(index, 'contact', e.target.value)}
              />
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditContactsDialog} color="primary">Cancel</Button>
          <Button onClick={handleSaveEditedContacts} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserLandingPage;
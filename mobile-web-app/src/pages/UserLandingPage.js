import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmergencyButton from '../components/EmergencyButton';
import logo from "../LOGO.png"
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
  TextField,
  Link
} from '@mui/material';
import { 
  Event as EventIcon, 
  Phone as PhoneIcon, 
  Email as EmailIcon,
  Edit as EditIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';

const UserLandingPage = () => {
  const navigate = useNavigate();
  const [mentorName, setMentorName] = useState("Sarah Johnson");
  const [totalPoints, setTotalPoints] = useState(300);
  const [displayedPoints, setDisplayedPoints] = useState(0);
  const [events, setEvents] = useState([
    { date: "2024-10-20", title: "Meeting with Mentor" },
    { date: "2024-10-22", title: "Community Volunteering" },
    { date: "2024-10-25", title: "Career Workshop" },
  ]);
  const [quickContacts, setQuickContacts] = useState([
    { name: "Emergency Hotline", contact: "911" },
    { name: "Mentor", contact: "mentor@example.com" },
    { name: "Support Group", contact: "1-800-SUPPORT" },
  ]);

  // Profile Settings Dialog State
  const [openProfileSettingsDialog, setOpenProfileSettingsDialog] = useState(false);
  const [email, setEmail] = useState("user@example.com");
  const [location, setLocation] = useState("South Dallas");

  // Edit Contacts Dialog State
  const [openEditContactsDialog, setOpenEditContactsDialog] = useState(false);
  const [editedContacts, setEditedContacts] = useState(quickContacts);

  // Points Redemption Dialog State
  const [openRedeemPointsDialog, setOpenRedeemPointsDialog] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);

  const rewardOptions = [
    { points: 100, description: "$10 Cash Incentive" },
    { points: 200, description: "$20 Food Stamp Voucher" },
    { points: 150, description: "Voucher for Local South Dallas Restaurant" },
    { points: 50, description: "Grocery Voucher for Local South Dallas Store" },
    { points: 75, description: "Fresh Produce Box from Local Farm" }
  ];

  useEffect(() => {
    let start = 0;
    const end = totalPoints;
    if (start === end) return;

    let incrementTime = 10;
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

  const handleOpenProfileSettingsDialog = () => {
    setOpenProfileSettingsDialog(true);
  };

  const handleCloseProfileSettingsDialog = () => {
    setOpenProfileSettingsDialog(false);
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

  const handleOpenRedeemPointsDialog = () => {
    setOpenRedeemPointsDialog(true);
  };

  const handleCloseRedeemPointsDialog = () => {
    setOpenRedeemPointsDialog(false);
    setSelectedReward(null);
  };

  const handleRedeemPoints = () => {
    if (selectedReward && totalPoints >= selectedReward.points) {
      setTotalPoints(totalPoints - selectedReward.points);
      // Here you would typically call an API to process the redemption
      alert(`You have redeemed ${selectedReward.points} points for ${selectedReward.description}. It has been sent to your email`);
      handleCloseRedeemPointsDialog();
    } else {
      alert("You don't have enough points for this reward.");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Emergency Button at the top */}
      <EmergencyButton />

      {/* Static Logo in the top left */}
      <Box sx={{ position: 'absolute', top: '80px', left: '16px' }}>
        <img 
          src={logo} 
          alt="Support App Logo" 
          style={{ width: '80px', height: '40px', cursor: 'pointer' }} 
          onClick={() => navigate('/')}
        />
      </Box>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <IconButton onClick={handleOpenProfileSettingsDialog} size="small">
          <SettingsIcon />
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
            <Link
              component="button"
              variant="body2"
              onClick={handleOpenRedeemPointsDialog}
              sx={{ alignSelf: 'flex-start', mt: 1 }}
            >
              Redeem Points
            </Link>
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

      {/* Redeem Points Dialog */}
      <Dialog open={openRedeemPointsDialog} onClose={handleCloseRedeemPointsDialog}>
        <DialogTitle>Redeem Your Points</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            You have {totalPoints} points available to redeem.
          </Typography>
          <List>
            {rewardOptions.map((option, index) => (
              <ListItem
                key={index}
                button
                selected={selectedReward === option}
                onClick={() => setSelectedReward(option)}
              >
                <ListItemText 
                  primary={option.description} 
                  secondary={`${option.points} points`} 
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRedeemPointsDialog} color="primary">Cancel</Button>
          <Button onClick={handleRedeemPoints} color="primary" disabled={!selectedReward}>
            Redeem
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserLandingPage;
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { 
  ChevronLeft, 
  ChevronRight, 
  Add as AddIcon
} from '@mui/icons-material';

const Calendar = ({ userRole }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [openEventDialog, setOpenEventDialog] = useState(false);
  const [openEventDetailsDialog, setOpenEventDetailsDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({ title: '', description: '', date: '', time: '' });

  const isAdminOrMentor = userRole === 'admin' || userRole === 'mentor';

  // Sample events
  useEffect(() => {
    const sampleEvents = {
      '2024-10-20': [
        { title: 'Team Meeting', time: '10:00 AM', color: '#4285F4', description: 'Discuss project progress' },
        { title: 'Lunch with Sarah', time: '12:30 PM', color: '#0F9D58', description: 'At the new Italian restaurant' }
      ],
      '2024-10-21': [
        { title: 'Project Deadline', time: '09:00 AM', color: '#DB4437', description: 'Submit final report' }
      ],
      '2024-10-23': [
        { title: 'Yoga Class', time: '06:00 PM', color: '#F4B400', description: 'Remember to bring your mat' }
      ],
      '2024-10-25': [
        { title: 'Dentist Appointment', time: '02:00 PM', color: '#4285F4', description: 'Annual check-up' },
        { title: 'Movie Night', time: '08:00 PM', color: '#0F9D58', description: 'Watch the new superhero movie' }
      ]
    };
    setEvents(sampleEvents);
  }, []);

  const getWeekDates = (date) => {
    const week = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(date);
      day.setDate(date.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const weekDates = getWeekDates(currentDate);

  const handlePrevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const handleAddEvent = () => {
    if (isAdminOrMentor) {
      setOpenEventDialog(true);
    }
  };

  const handleCloseEventDialog = () => {
    setOpenEventDialog(false);
    setNewEvent({ title: '', description: '', date: '', time: '' });
  };

  const handleSaveEvent = () => {
    const eventDate = new Date(newEvent.date);
    const eventKey = `${eventDate.getFullYear()}-${eventDate.getMonth() + 1}-${eventDate.getDate()}`;
    const formattedTime = formatTime(newEvent.time);
    setEvents(prevEvents => ({
      ...prevEvents,
      [eventKey]: [...(prevEvents[eventKey] || []), { ...newEvent, time: formattedTime, color: '#4285F4' }]
    }));
    handleCloseEventDialog();
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setOpenEventDetailsDialog(true);
  };

  const handleCloseEventDetailsDialog = () => {
    setOpenEventDetailsDialog(false);
    setSelectedEvent(null);
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  const parseTime = (timeString) => {
    const [time, period] = timeString.split(' ');
    let [hours, minutes] = time.split(':');
    hours = parseInt(hours);
    if (period === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }
    return { hours, minutes };
  };

  const renderWeekView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);

    return (
      <Box sx={{ display: 'flex', height: 'calc(100vh - 150px)', overflowY: 'auto' }}>
        <Box sx={{ width: '80px', flexShrink: 0 }}>
          {hours.map(hour => (
            <Box key={hour} sx={{ height: '60px', borderBottom: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="caption">{formatTime(`${hour}:00`)}</Typography>
            </Box>
          ))}
        </Box>
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          {weekDates.map((date, index) => {
            const dateKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            const dayEvents = events[dateKey] || [];

            return (
              <Box key={index} sx={{ flexGrow: 1, borderLeft: '1px solid #e0e0e0' }}>
                {hours.map(hour => (
                  <Box key={hour} sx={{ height: '60px', borderBottom: '1px solid #e0e0e0', position: 'relative' }}>
                    {dayEvents
                      .filter(event => {
                        const { hours: eventHour } = parseTime(event.time);
                        return eventHour === hour;
                      })
                      .map((event, eventIndex) => (
                        <Paper
                          key={eventIndex}
                          onClick={() => handleEventClick(event)}
                          sx={{
                            position: 'absolute',
                            top: '0',
                            left: '2px',
                            right: '2px',
                            height: '58px',
                            backgroundColor: event.color,
                            color: 'white',
                            padding: '2px',
                            overflow: 'hidden',
                            cursor: 'pointer',
                          }}
                        >
                          <Typography variant="caption">{event.time}</Typography>
                          <Typography variant="body2" noWrap>{event.title}</Typography>
                        </Paper>
                      ))}
                  </Box>
                ))}
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" sx={{ color: '#8e44ad' }}>
          {`${weekDates[0].toLocaleDateString('default', { month: 'long', day: 'numeric' })} - ${weekDates[6].toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric' })}`}
        </Typography>
        <Box>
          <IconButton onClick={handlePrevWeek} sx={{ color: '#8e44ad' }}>
            <ChevronLeft />
          </IconButton>
          <IconButton onClick={handleNextWeek} sx={{ color: '#8e44ad' }}>
            <ChevronRight />
          </IconButton>
          {isAdminOrMentor && (
            <Button
              startIcon={<AddIcon />}
              onClick={handleAddEvent}
              sx={{ 
                ml: 2, 
                backgroundColor: '#f1c40f', 
                color: '#000',
                '&:hover': { backgroundColor: '#f39c12' }
              }}
            >
              Add Event
            </Button>
          )}
        </Box>
      </Box>

      <Grid container spacing={1} sx={{ mb: 2 }}>
        {weekDates.map((date, index) => (
          <Grid item xs key={index}>
            <Typography variant="subtitle2" align="center" sx={{ fontWeight: 'bold', color: '#8e44ad' }}>
              {date.toLocaleDateString('default', { weekday: 'short' })}
            </Typography>
            <Typography variant="body2" align="center">
              {date.getDate()}
            </Typography>
          </Grid>
        ))}
      </Grid>

      {renderWeekView()}

      <Dialog open={openEventDialog} onClose={handleCloseEventDialog}>
        <DialogTitle>Add New Event</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Event Title"
            type="text"
            fullWidth
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Event Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Event Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Event Time"
            type="time"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newEvent.time}
            onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEventDialog} sx={{ color: '#8e44ad' }}>Cancel</Button>
          <Button onClick={handleSaveEvent} sx={{ backgroundColor: '#f1c40f', color: '#000' }}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEventDetailsDialog} onClose={handleCloseEventDetailsDialog}>
        <DialogTitle>{selectedEvent?.title}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Time: {selectedEvent?.time}</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>Description: {selectedEvent?.description}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEventDetailsDialog} sx={{ color: '#8e44ad' }}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Calendar;
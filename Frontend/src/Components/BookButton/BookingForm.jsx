import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import AddIcon from '@mui/icons-material/Add';
import DialogActions from '@mui/material/DialogActions';
import { Select, TextField, Button, MenuItem, Typography } from '@mui/material';
import DatePicker from '../DatePicker/DatePicker';
import dayjs from 'dayjs';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
const SERVER_DATE_FORMAT = 'YYYY-MM-DD';


const leaveTypes = ['Annual Leave'];

function BookingForm({ setRows }) {
  const [open, setOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState('');
  const [managerEmail, setManagerEmail] = useState('');
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());

  const handleLeaveChange = (event) => {
    setSelectedLeave(event.target.value);
  };

  const handleEmailChange = (event) => {
    setManagerEmail(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      dateFrom: dayjs(startDate).format(SERVER_DATE_FORMAT) ,
      dateTo: dayjs(endDate).format(SERVER_DATE_FORMAT)
    };
    const token = localStorage.getItem('accessToken');
    try {
      const response = await fetch('http://4.223.160.231:8080/api/v1/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify({
          dateFrom: formData.dateFrom,
          dateTo: formData.dateTo,
        })
      });

      const data = await response.json();

      setRows((prevState) => ([
        ...prevState,
        data
      ]))

      if (response.ok) {
        handleClose();
      } else {
        console.error('Form submission failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        style={{ textTransform: 'capitalize', backgroundColor: '#2E72D3', color: '#fff' }}
        onClick={handleOpen}
      >
        <AddIcon fontSize="small" />
        Request leave
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "388px",
              height: "490px",
            }
          }
        }}
      >


        <DialogTitle component="h1" fontSize={24} sx={{ fontWeight: 'bold', marginBottom: '20px', marginTop: '20px' }}>
          Book your vacation 
          <Button
  sx={{
    width: '16px',
    height: '16px',
    '&:hover': {  
      backgroundColor: 'transparent', 
    },
    marginLeft:8,  
    color: '#262629',
  }}
  onClick={handleClose}
>
  <CloseIcon  fontSize='small'/>
</Button>
        </DialogTitle>

        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Typography>Engagement Manager email</Typography>
            <TextField
              hiddenLabel
              placeholder="Name@nortal.com"
              id="manager-email"
              variant="outlined"
              fullWidth
              size='small'
              name="email"
              value={managerEmail}
              onChange={handleEmailChange}
              sx={{ marginBottom: '10px' }}
            />

            <DatePicker
              onStartDateChange={handleStartDateChange}
              onEndDateChange={handleEndDateChange}
            />

            <Typography>Type of Leave</Typography>
            <Select
              labelId="leave-type-label"
              id="leave-type-select"
              value={selectedLeave}
              onChange={handleLeaveChange}
              fullWidth
              size="small"
              sx={{ fontSize: '0.8rem', marginBottom: '20px' }}
            >
              {leaveTypes.map((leaveType, index) => (
                <MenuItem key={index} value={leaveType}>
                  {leaveType}
                </MenuItem>
              ))}
            </Select>
            <Typography>Upload File</Typography>
            <TextField
  hiddenLabel
  id="file"
  variant="outlined"
  fullWidth
  size='small'
  name="file"
  sx={{ marginBottom: '10px' }}
  InputProps={{
    endAdornment: (
      <DownloadIcon color="action" />
    ),
  }}
/>
            <DialogActions>
              <Button type="submit"  fontWeight='light' variant="contained" color="primary" style={{ textTransform: 'capitalize',
    width: '95px',
    height: '32px',}}>
                Submit
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default BookingForm;

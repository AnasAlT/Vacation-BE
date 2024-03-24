/* eslint-disable react/prop-types */
import { Box, Typography, Card, CardContent } from '@mui/material';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
const UpcomingBox = ({rows}) => {
const [dates, setDates] = useState({ dateFrom: '', dateTo: '' });

useEffect(() => {
  if (rows && rows.length > 0) {
    rows.sort((a, b) => {
      const dateA = dayjs(a.dateFrom).valueOf();
      const dateB = dayjs(b.dateFrom).valueOf();
      return Math.abs(dateA - Date.now()) - Math.abs(dateB - Date.now());
    });

    setDates({
      dateFrom: rows[0].dateFrom,
      dateTo: rows[0].dateTo
    });
  }
}, [rows]);



  return (
    <div>
      <Card sx={{ width: 415, height: 195, display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: "#FAFBFB" }}>
        <CardContent sx={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>

          <Typography fontSize={24} sx={{ fontWeight: 'bold', marginTop: '20px', marginBottom: '20px' }}>
            Upcoming
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '86px',
                height: '91px',
                borderRadius: '8.73px',
                backgroundColor: '#ffffff',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                marginRight: '20px',
                marginBottom: '20px',
              }}
            >
              <Typography fontSize={24} sx={{ fontWeight: 'bold' }}>
                Feb
              </Typography>
            </Box>
            <Box sx={{ borderRight: '2px solid #82808740', width: '100px', height: '50px', marginRight: '20px', display: 'flex', alignItems: 'left', flexDirection: 'column', justifyContent: 'left' }}>
              <Typography>Type</Typography>
              <Typography>Annual Leave</Typography>
            </Box>
            <Box xs={{ padding: '20px', display: 'flex', alignItems: 'left', justifyContent: 'left', margin: 5 }}>
              <Typography>Date</Typography>
              <Typography>from: {dayjs(dates.dateFrom).format('YYYY-MM-DD')}</Typography> 
              <Typography>To: {dayjs(dates.dateTo).format('YYYY-MM-DD')}</Typography> 
      
            </Box>
          </Box>

        </CardContent>
      </Card>
    </div>
  );
};

export default UpcomingBox;

import { PieChart } from '@mui/x-charts/PieChart';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';

const Remaining = () => {
  const [totalDays, setTotalDays] = useState(0);
  const [remainingDays, setRemainingDays] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch('http://4.223.160.231:8080/api/v1/users/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
        });
        const data = await response.json(); // Parse response to JSON
        setTotalDays(data.totalVacationDays);
        setRemainingDays(data.remainingDays);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
  const usedDays = totalDays - remainingDays;
  const data = [
    { value: usedDays, name: 'Used Days', color: '#E7E7E4' },
    { value: remainingDays, name: 'Remaining Days', color: '#56B43E' }
  ];

  return (
    <Card sx={{ width: 415, height: 195, display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: "#FAFBFB" }}>
      <CardContent sx={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
      <Typography fontSize={24} sx={{ fontWeight: 'bold',  marginBottom:'10px' , marginTop:'5px' }}>
              Remaining
            </Typography>
        <Typography color="text.secondary"  marginBottom='70px'>
          Remaining days from annual leave
        </Typography>
      </CardContent>
      <Box sx={{ flex: '1 1 auto', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <PieChart
          series={[{ data, innerRadius: '90%', outerRadius: '100%', startAngle: 0, endAngle: -360, cx: '89%',
          cy: '49%' }]}
          height={220}
          width= {225}
        />
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
          <Typography variant="h4" component="div">
            {remainingDays}
          </Typography>
          <Typography color="text.secondary">
            Remaining days per year
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default Remaining;

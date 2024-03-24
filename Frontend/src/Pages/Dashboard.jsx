import SideBar from "../Components/SideBar/SideBar";
import RequestTable from "../Components/Tables/RequestTable";
import UpcomingBox from "../Components/UpComingBox/UpcomingBox";
import Remaining from "../Components/Remaining/Remaining";
import Profile from "../Components/Profile/Profile";
import BookingForm from "../Components/BookButton/BookingForm";
import { Typography , Stack} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate(); 
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      navigate('/');
    }
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch('http://4.223.160.231:8080/api/v1/bookings/requests', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
        });
        const data = await response.json();
        setRows(data); 
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Profile />
        <div style={{ display: 'flex', justifyContent: 'center' ,  margin:30}}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" gap={10}>
          <Remaining />
          <UpcomingBox rows={rows} />
          </Stack>
        </div>
        <Stack width="53%" direction="row"alignItems="center" justifyContent="space-between" margin={3}>

            <Typography fontSize={24} sx={{ fontWeight: 'bold'}}>
                My Requests </Typography>
        <BookingForm setRows={setRows} />
        </Stack>
        </div>
    
      <SideBar />
      <RequestTable rows={rows} />
    </>
  );
};

export default Dashboard;

import { Typography, Box } from "@mui/material";
import SideBar from "../Components/SideBar/SideBar";
import AdminTable from "../Components/Tables/AdminTable";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

const AdminPage = () => {
    const navigate = useNavigate(); 
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        const gettingProfile = async () => {
            try {
                let token = localStorage.getItem('accessToken');
                const response = await fetch('http://4.223.160.231:8080/api/v1/bookings/requests', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                    },
                });
                const data = await response.json();
                const bookingsData = data?.map(({ id, firstName, lastName, dateFrom, dateTo, status }) => {
                    const name = `${firstName} ${lastName}`;
                    const leaveCategory = "annual leave";
                    return {
                      id,
                      name,
                      leaveCategory,
                      from: dateFrom,
                      to: dateTo,
                      status,
                    };
                });           
                setBookings(bookingsData);
            } catch (error) {
                console.error('Error fetching the vacation requests : ', error);
            }
        }
        gettingProfile()
    }, [])

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
        navigate('/');
        }
    }, []);
    return (
        <Box display="flex" height="100vh">
            <SideBar />
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="left"
                flexGrow={2}
                padding={20}
                margin={10}
                marginRight={30}
                marginBottom={20}
            >
                <Typography variant="h4" fontWeight="bold" marginBottom="20px" marginLeft={7}>
                    All requests
                </Typography>
                <AdminTable bookings={bookings} setBookings={setBookings} />
            </Box>
        </Box>
    );
};

export default AdminPage;

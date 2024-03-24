import { Avatar, Box, Typography } from '@mui/material';
const Profile = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'left' }}>
                <Avatar src="/broken-image.jpg"   sx={{ marginTop:10, width: 97, height: 97, border: '3px solid #009639' , marginRight: '20px', backgroundColor: "#ffffff"
, color: '#DBDBDB',
}}/>

      <Box     sx={{
                  display: 'flex',
                  alignItems: 'left',
                  justifyContent: 'left',
                  padding: '20px',
                  width: '800px',
                  marginBottom: '20px',
                  borderBottom: '2px solid #82808740'
                  }}>
    
      <Typography fontSize={24} sx={{ fontWeight: 'bold', marginTop:10, marginBottom: '20px' }}>
              Good Morning, User
            </Typography>
      </Box>
        </div>
    );
};

export default Profile;
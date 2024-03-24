import { Container, List, ListItemButton, ListItemIcon, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import './SideBar.css'
import { useNavigate } from "react-router-dom";



const SideBarContainer = styled(Container)(({ theme }) => ({
    position: 'fixed', 
    left: '0', 
    top: '0',
    width: "68px",
    height: '100vh', 
    zIndex: '3',
    backgroundColor: "#009639",
    color: 'white',
    '&:hover': {
        width: '142px',
    },
    transition: 'width 0.3s ease-in-out',
}));

const SideBarItem = styled(ListItemButton)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '68px',
    maxWidth: '68px',
    margin: '0',
    padding: '0 10px',
    position: 'relative',
    '&:hover': {
        backgroundColor: "transparent",
        transform: 'scale(1.1)',
        '&::before': {
            opacity: 1,
        },
    },
    '&::before': {
        content: '""',
        position: 'absolute',
        left: 'calc(50% - 20px)',
        height: '24px',
        width: '1.5px',
        backgroundColor: 'white',
        opacity: 0,
        transition: 'opacity 0.3s ease-in-out',
    },
    '& .MuiListItemIcon-root': {
        justifyContent: 'center',
        position: 'relative',
    },
}));

const SideBar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem('accessToken');
      
      navigate('/login'); 
    };
  
    return (
        <SideBarContainer className="SideBarParent">
            <List sx={{ position: 'absolute', width:  '68px', left: '0'}}>
                <SideBarItem disableRipple>
                        <img src="/images/SideBarLogo.svg" alt="Nortal Logo" />
                </SideBarItem>
                <SideBarItem onClick={() => navigate("/dashboard")} disableRipple>
                    <ListItemIcon>
                        <img src="/images/icons/home.svg" alt="Home Icon" />
                    </ListItemIcon>
                    <Typography className="StyledListItemText" sx={{ position: 'absolute', marginLeft: '100px', marginTop: '5px'}} fontSize={14}>Home</Typography>
                </SideBarItem>
                <SideBarItem onClick={() => navigate("/help")} disableRipple>
                    <ListItemIcon>
                        <img src="/images/icons/FAQ.svg" alt="FAQ Icon" />
                    </ListItemIcon>
                    <Typography className="StyledListItemText" sx={{ position: 'absolute', marginLeft: '100px', marginTop: '5px'}} fontSize={14}>Help</Typography>
                </SideBarItem>
                <SideBarItem onClick={handleLogout} disableRipple>
                  
      <ListItemIcon>
        <img src="/images/icons/logout.svg" alt="Log out Icon" />
      </ListItemIcon>
      <Typography   className="StyledListItemText" sx={{ position: 'absolute', marginLeft: '100px', marginTop: '5px'}} fontSize={14}>Log out</Typography>
 
    </SideBarItem>
            </List>
        </SideBarContainer>
    );
}

export default SideBar;

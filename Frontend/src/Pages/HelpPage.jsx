import { Accordion, AccordionSummary, AccordionDetails, Typography, Button, Box, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Sidebar from '../Components/SideBar/SideBar';

const faqs = [
    {
      question: 'What is the purpose of our vacation booking tool?',
      answer: 'Our vacation booking tool streamlines the process of requesting vacation leave for employees. It ensures an efficient booking, reduces manual effort, and provides a centralized platform for managing vacation arrangements between different stakeholders within the organization.'
    },
    {
      question: 'Can I register with a different email address than Nortal?',
      answer: 'Unfortunately, we cannot issue non-Nortal emails at this time.'
    },
    {
      question: 'I just made a new account, but why can’t I log in yet?',
      answer: 'Our vacation booking tool streamlines the process of requesting vacation leave for employees. It ensures an efficient booking, reduces manual effort, and provides a centralized platform for managing vacation arrangements between different stakeholders within the organization.'
    },
    {
      question: 'What do I do if my password is not working?',
      answer: 'Our vacation booking tool streamlines the process of requesting vacation leave for employees. It ensures an efficient booking, reduces manual effort, and provides a centralized platform for managing vacation arrangements between different stakeholders within the organization.'
    },
    {
      question: 'What if I encounter issues during the booking process?',
      answer: 'Our vacation booking tool streamlines the process of requesting vacation leave for employees. It ensures an efficient booking, reduces manual effort, and provides a centralized platform for managing vacation arrangements between different stakeholders within the organization.'
    },
    {
      question: 'Can I modify or cancel my booking?',
      answer: 'Our vacation booking tool streamlines the process of requesting vacation leave for employees. It ensures an efficient booking, reduces manual effort, and provides a centralized platform for managing vacation arrangements between different stakeholders within the organization.'
    },
    {
      question: 'How do I track my bookings?',
      answer: 'Our vacation booking tool streamlines the process of requesting vacation leave for employees. It ensures an efficient booking, reduces manual effort, and provides a centralized platform for managing vacation arrangements between different stakeholders within the organization.'
    },
    {
      question: 'How far in advance can I make a booking?',
      answer: 'Our vacation booking tool streamlines the process of requesting vacation leave for employees. It ensures an efficient booking, reduces manual effort, and provides a centralized platform for managing vacation arrangements between different stakeholders within the organization.'
    }
];
  

const HelpPage = () => {
  return (
    <Box display="flex" height="100vh" bgcolor="white">
      <Sidebar />
      <Grid container style={{ flexGrow: 1, marginLeft: 100}}>
        <Grid item xs={false} md={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem', marginTop: 110 }}>
          <Box sx={{ textAlign: 'center', maxWidth: '360px' }}>
            <img src="/images/contact-us.svg" alt="Contact us" style={{ width: '320px', marginBottom: '1rem' }} />
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Get in touch
            </Typography>
            <Typography variant="body1" sx={{ my: 2 }}>
              If you need any further help or any question, please contact us via email
            </Typography>
            <Button variant="contained" sx={{ backgroundColor: '#39823C' }} component="a" href="mailto:">
              Contact us
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={8} style={{ overflow: 'auto'}}>
            <Box display="flex" alignItems="center" justifyContent="center" height="100%">
            <Box sx={{ maxWidth: '760px', width: '100%' }}>
            <Box sx={{ position: 'relative', mb: 2, display: 'inline-block', marginBottom: '25px' }}>
              <Typography variant="h4" sx={{ color: 'green', fontWeight: 'bold' }}>
                FAQ
              </Typography>
              <Box sx={{ position: 'absolute', height: '3.5px', width: '200%', backgroundColor: 'green', bottom: '-5px', left: '1%' }} />
            </Box>
            {faqs.map((faq, index) => (
                <Accordion key={index} elevation={0}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{ color: 'black' }} />}
                    aria-controls={`panel${index}a-content`}
                    id={`panel${index}a-header`}
                >
                    <Typography fontWeight="bold">{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                    {faq.answer}
                    </Typography>
                </AccordionDetails>
                </Accordion>
            ))}
            </Box>
    </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HelpPage;

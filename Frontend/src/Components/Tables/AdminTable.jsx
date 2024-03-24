/* eslint-disable react/prop-types */
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#009639',
    textAlign: 'center',
    fontSize: 14,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    textAlign: 'center',
  },
  '& .statusText': {
    padding: '2px 8px',
    borderRadius: '4px',
  },
  '& .PENDING': {
    color: '#F5AC77', 
    backgroundColor: '#FCA82A33', 
  },
  '& .APPROVED': {
    color: '#14AE5C',
    backgroundColor: '#ECFFEE',
  },
  '& .REJECTED': {
    color: '#B73F41',
    backgroundColor: '#FFD1D2',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#102C3805',
    borderColor: '#EAF1F3',
  },
  '&:last-child td, &:last-child th': {
    borderColor: '#EAF1F3',
  },
}));

const ROWS_PER_PAGE = 10;

export default function AdminTable({ bookings, setBookings }) {
  console.log(bookings);
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handlePrevClick = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleNextClick = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const sendUpdateRequest = async (endpoint, bookingId, newStatus) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`http://4.223.160.231:8080/api/v1/bookings/${bookingId}/${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setBookings(currentRows => currentRows.map(row => 
        row.id === bookingId ? { ...row, status: newStatus } : row
      ));
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const handleAccept = (bookingId) => {
    sendUpdateRequest('approval', bookingId, 'APPROVED');
  };

  const handleReject = (bookingId) => {
    sendUpdateRequest('rejection', bookingId, 'REJECTED');
  };

  return (
    <div style={{ maxWidth: '898px', margin: 'auto' }}>
      <TableContainer component={Paper} sx={{ borderRadius: '8.73px', width: '1146px', height: '636px' }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Leave Category</StyledTableCell>
              <StyledTableCell>From</StyledTableCell>
              <StyledTableCell>To</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings
              .slice(page * ROWS_PER_PAGE, page * ROWS_PER_PAGE + ROWS_PER_PAGE)
              .map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell>{row.leaveCategory}</StyledTableCell>
                  <StyledTableCell>{row.from}</StyledTableCell>
                  <StyledTableCell>{row.to}</StyledTableCell>
                  <StyledTableCell>
                  <span className={`statusText ${row.status}`}>
                    {row.status.charAt(0).toUpperCase() + row.status.slice(1).toLowerCase()}
                  </span>
                  </StyledTableCell>
                  <StyledTableCell>
                    {row.status === 'PENDING' ? (
                      <>
                        <Button size="small" variant="contained" color="success" style={{ textTransform: 'capitalize', marginRight: '8px' }} onClick={() => handleAccept(row.id)}>
                          Accept
                        </Button>
                        <Button size="small" variant="contained" color="error" style={{ textTransform: 'capitalize' }} onClick={() => handleReject(row.id)}>
                          Reject
                        </Button>
                      </>
                    ) : (
                      <span>-</span>
                    )}
                </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
        <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ marginTop:'12px' }}>
          <Button variant="text" sx={{ color: '#C1C0C4' }} onClick={handlePrevClick} disabled={page === 0}>Prev</Button>
          <Pagination
            count={Math.ceil(bookings.length / ROWS_PER_PAGE)}
            color="primary"
            page={page + 1}
            onChange={handleChangePage}
          />
          <Button variant="text" sx={{ color: '#000' }} onClick={handleNextClick} disabled={page === Math.ceil(bookings.length / ROWS_PER_PAGE) - 1}>Next</Button>
        </Stack>
      </TableContainer>
    </div>
  );
}

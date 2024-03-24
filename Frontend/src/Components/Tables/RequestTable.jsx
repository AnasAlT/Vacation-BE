/* eslint-disable react/prop-types */
import  { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell ,{ tableCellClasses} from '@mui/material/TableCell';
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

export default function RequestTable({rows}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePrevClick = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleNextClick = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div style={{ maxWidth: '898px', margin: 'auto' }}>
      <TableContainer component={Paper} sx={{ borderRadius: '8.73px', width: '898px', height: '355px' }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Leave Category</StyledTableCell>
              <StyledTableCell>From</StyledTableCell>
              <StyledTableCell>To</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    Annual Leave
                  </StyledTableCell>
                  <StyledTableCell>{row.dateFrom}</StyledTableCell>
                  <StyledTableCell>{row.dateTo}</StyledTableCell>
                  <StyledTableCell>
                  <span className={`statusText ${row.status}`}>
  {row.status.charAt(0).toUpperCase() + row.status.slice(1).toLowerCase()}
</span>

                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
        <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ marginTop:'12px' }}>
          <Button variant="text" sx={{ color: '#C1C0C4' }} onClick={handlePrevClick} disabled={page === 0}>Prev</Button>
          <Pagination
            count={Math.ceil(rows.length / rowsPerPage)}
            color="primary"
            page={page + 1}
            onChange={handleChangePage}
          />
          <Button variant="text" sx={{ color: '#000' }} onClick={handleNextClick} disabled={page === Math.ceil(rows.length / rowsPerPage) - 1}>Next</Button>
        </Stack>
      </TableContainer>
    </div>
  );
}

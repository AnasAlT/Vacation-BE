import { useState } from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const DatePicker = ({ onStartDateChange, onEndDateChange }) => {
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());

  const handleStartDateChange = (date) => {
    setStartDate(date);
    onStartDateChange(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    onEndDateChange(date);
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
          components={[
            'DatePicker',
            'DesktopDatePicker',
          ]}
        >
          <DemoItem label=" From">
            <DesktopDatePicker
              value={startDate}
              onChange={handleStartDateChange}
            />
          </DemoItem>
          <div style={{ marginBottom: '16px' }}>
            <DemoItem label="To">
              <DesktopDatePicker
                fullWidth
                value={endDate}
                onChange={handleEndDateChange}
              />
            </DemoItem>
          </div>
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
};

export default DatePicker;

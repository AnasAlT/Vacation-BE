package com.nortal.vacation.booking;

import java.util.List;

public interface BookingService {

    BookingRecord createBooking(BookingRecord bookingRecord) throws UserNotFoundException;
    List<BookingRecord> getAllBookings();
    List<BookingRecord> getRequestedVacationsForCurrentUser() throws UserNotFoundException;

    void approveRequest(Long id) throws UserNotFoundException;
    void rejectRequest(Long id);
}

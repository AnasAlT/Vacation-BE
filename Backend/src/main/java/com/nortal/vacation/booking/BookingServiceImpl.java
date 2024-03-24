package com.nortal.vacation.booking;

import com.nortal.vacation.profile.Profile;
import com.nortal.vacation.profile.ProfileRepository;
import com.nortal.vacation.user.SecurityUser;
import com.nortal.vacation.user.User;
import com.nortal.vacation.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;

    @Override
    public BookingRecord createBooking(BookingRecord bookingRecord) throws UserNotFoundException {
        SecurityUser securityUser = (SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = securityUser.getUsername();


        User currentUser = userRepository.findByUsername(username)
                .orElseThrow(UserNotFoundException::new);


        Booking booking = new Booking();
        booking.setUser(currentUser);
        booking.setDateFrom(bookingRecord.dateFrom());
        booking.setDateTo(bookingRecord.dateTo());
        booking.setStatus(BookingStatus.PENDING);


        Booking savedBooking = bookingRepository.save(booking);


        return new BookingRecord(savedBooking.getId(),currentUser.getFirstName(), currentUser.getLastName(),savedBooking.getDateFrom(), savedBooking.getDateTo(), savedBooking.getStatus());
    }

    @Override
    public List<BookingRecord> getAllBookings() {

        return bookingRepository.findAll().stream()
                .map(this::mapToBookingRecord)
                .collect(Collectors.toList());
    }

    @Override
    public List<BookingRecord> getRequestedVacationsForCurrentUser() throws UserNotFoundException {
        SecurityUser securityUser = (SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = securityUser.getUsername();

        User currentUser = userRepository.findByUsername(username)
                .orElseThrow(UserNotFoundException::new);
        Sort sort = Sort.by("dateFrom").ascending();
         return bookingRepository.findByUser(currentUser, sort).stream().map(b -> new BookingRecord(b.getId(),currentUser.getFirstName(), currentUser.getLastName() ,b.getDateFrom(), b.getDateTo(), b.getStatus())).toList();



    }

    private BookingRecord mapToBookingRecord(Booking booking) {
        return new BookingRecord(booking.getId(), booking.getUser().getFirstName(), booking.getUser().getLastName() ,booking.getDateFrom(), booking.getDateTo(), booking.getStatus());
    }

    public void approveRequest(Long id) throws UserNotFoundException {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        booking.setStatus(BookingStatus.APPROVED);
        bookingRepository.save(booking);

        long vacationDays = ChronoUnit.DAYS.between(booking.getDateFrom(), booking.getDateTo());

        Profile profile = booking.getUser().getProfile();

        long totalSpentVacationDays = profile.getTotalSpentVacationDays() + vacationDays;
        profile.setTotalSpentVacationDays((int) totalSpentVacationDays);

        profileRepository.save(profile);

    }

    public void rejectRequest(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        booking.setStatus(BookingStatus.REJECTED);
        bookingRepository.save(booking);
    }
}



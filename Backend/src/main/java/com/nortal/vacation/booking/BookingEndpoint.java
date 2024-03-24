// BookingEndpoint.java
package com.nortal.vacation.booking;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/bookings")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class BookingEndpoint {

    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<BookingRecord> createBooking(@RequestBody BookingRecord bookingRecord) throws UserNotFoundException {
        BookingRecord createdBooking = bookingService.createBooking(bookingRecord);
        return ResponseEntity.ok(createdBooking);
    }

    @GetMapping
    public ResponseEntity<List<BookingRecord>> getAllBookings() {
        List<BookingRecord> bookings = bookingService.getAllBookings();
        return ResponseEntity.ok(bookings);
    }

    @GetMapping("requests")
//    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<BookingRecord>> getRequestedVacations() throws UserNotFoundException {
        List<BookingRecord> requestedVacations = bookingService.getRequestedVacationsForCurrentUser();
        return ResponseEntity.ok(requestedVacations);
    }


    // Endpoint to approve a request
    @PutMapping("{id}/approval")
    public ResponseEntity<?> approveRequest(@PathVariable Long id) throws UserNotFoundException {
            bookingService.approveRequest(id);
            return ResponseEntity.ok().body("Request with ID " + id + " approved");

    }

    // Endpoint to reject a request
    @PutMapping("{id}/rejection")
    public ResponseEntity<?> rejectRequest(@PathVariable Long id) {
        bookingService.rejectRequest(id);
            return ResponseEntity.ok().body("Request with ID " + id + " rejected");
        }
    }

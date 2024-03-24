
package com.nortal.vacation.booking;

import com.nortal.vacation.user.User;
import lombok.*;

import jakarta.persistence.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@Table(name = "booking")
@NoArgsConstructor
@AllArgsConstructor
public class Booking {

    @Id
    @SequenceGenerator(name = "bookingIdGenerator", sequenceName = "seq_booking_id", initialValue = 10000, allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "bookingIdGenerator")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "date_from")
    private LocalDate dateFrom;

    @Column(name = "date_to")
    private LocalDate dateTo;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private BookingStatus status;
}

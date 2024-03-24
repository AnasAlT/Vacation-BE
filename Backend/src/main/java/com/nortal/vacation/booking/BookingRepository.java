package com.nortal.vacation.booking;

import com.nortal.vacation.user.User;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUser(User user, Sort sort);


}

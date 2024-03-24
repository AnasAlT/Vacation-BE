package com.nortal.vacation.booking;

import lombok.Data;

import java.time.LocalDate;

@Data
public class RequestedVacationRecord {
    private Long id;
    private LocalDate dateFrom;
    private LocalDate dateTo;
    private BookingStatus status;
}

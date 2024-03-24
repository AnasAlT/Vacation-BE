package com.nortal.vacation.booking;

import java.time.LocalDate;

public record BookingRecord(Long id,String firstName, String lastName ,LocalDate dateFrom, LocalDate dateTo, BookingStatus status) {
}

package com.nortal.vacation.user;

import java.util.List;

public record UserRecord(Long id, String email, String firstName, String lastName, String countryName, Integer totalVacationDays, Integer totalSpentVacationDays, List<Role> roles) {

    public Integer getRemainingDays() {
        return totalVacationDays - totalSpentVacationDays;
    }
}

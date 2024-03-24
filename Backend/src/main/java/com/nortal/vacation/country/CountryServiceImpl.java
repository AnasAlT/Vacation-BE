package com.nortal.vacation.country;

import com.nortal.vacation.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CountryServiceImpl {

    private final CountryRepository countryRepository;

    public void createCountryForUser(User user) {
        // Retrieve user's nationality and set vacation days accordingly
        String nationality = user.getCountryName();
        int vacationDays = calculateVacationDays(nationality);

        Country country = Country.builder()
                .user(user)
                .countryName(nationality)
                .vacationDays(vacationDays)
                .build();
        countryRepository.save(country);
    }

    private int calculateVacationDays(String nationality) {
        return switch (nationality) {
            case "Serbia" -> 23;
            case "Saudi Arabia" -> 21;
            default -> 25; // Default value
        };
    }
}

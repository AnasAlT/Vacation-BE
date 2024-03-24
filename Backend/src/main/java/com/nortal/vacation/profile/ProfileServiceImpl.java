package com.nortal.vacation.profile;

import com.nortal.vacation.booking.UserNotFoundException;
import com.nortal.vacation.user.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ProfileServiceImpl implements ProfileService {

    private final ProfileRepository profileRepository;
    private  final UserRepository userRepository;
    @Override
    public Profile createProfile(User user) {
        Profile profile = new Profile();
        profile.setUser(user);
        profile.setTotalSpentVacationDays(0);

        switch (user.getCountryName()) {
            case "OMAN", "UAE":
                profile.setTotalVacationDays(30);
                break;
            case "Serbia":
                profile.setTotalVacationDays(22);
            case "Saudi Arabia":
                profile.setTotalVacationDays(21);
                break;
            case "Canada":
                profile.setTotalVacationDays(10);
                break;
            case "US", "Germany", "Finland","Lithuania":
            default:
                profile.setTotalVacationDays(20);
                break;
        }

        return profileRepository.save(profile);
    }

    @Override
    public UserRecord getProfile() throws UserNotFoundException {

        SecurityUser securityUser = (SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = securityUser.getUsername();


        User currentUser = userRepository.findByUsername(username)
                .orElseThrow(UserNotFoundException::new);

        List<Role> roles = currentUser.getUserRoles().stream().map(UserRole::getRole).toList();

        return new UserRecord(
                currentUser.getId(),
                currentUser.getEmail(),
                currentUser.getFirstName(),
                currentUser.getLastName(),
                currentUser.getCountryName(),
                currentUser.getProfile().getTotalVacationDays(),
                currentUser.getProfile().getTotalSpentVacationDays(),
                roles);

    }
}

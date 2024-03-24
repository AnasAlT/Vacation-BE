package com.nortal.vacation.security;

import com.nortal.vacation.profile.Profile;
import com.nortal.vacation.profile.ProfileService;
import com.nortal.vacation.user.*;

import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional
public class AuthenticationServiceImpl implements AuthenticationService {

    public static final String EMAIL_REGEX = "^[A-Za-z0-9+_.-]+@nortal\\.com$";
    public static final String PASSWORD_REGEX = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-\\[\\]{};':\"\\\\|,.<>/?]).{8,}$";
    final AuthenticationManager authenticationManager;
    final JwtUtils jwtUtils;
    final PasswordEncoder passwordEncoder;
    final UserRepository userRepository;
    private final ProfileService profileService;

    @Override
    public AuthenticationRecord authenticate(final AuthenticationCmd auth) throws Exception {
        String username = auth.getUsername().toLowerCase();
        String password = auth.getPassword();

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                username,
                password));
        return new AuthenticationRecord(jwtUtils.createToken(username));
    }

    @Override
    public SecurityUser getAuthUser() {
        SecurityUser securityUser = (SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        assert securityUser != null;

        return securityUser;
    }


    @Override
    public UserRecord signup(SignupCmd cmd) {
        String email = cmd.getEmail().toLowerCase();
        String password = cmd.getPassword();

        Optional<User> existingUser = userRepository.findByUsername(email);
        if (existingUser.isPresent()) {
            throw new ValidationException("Email already exists");

        }
        // Check if email is provided and ends with '@nortal.com'
        if (email == null || !email.matches(EMAIL_REGEX)) {
            throw new ValidationException("Email must be provided and end with '@nortal.com'");
        }
        // Check password requirements
        if (password == null || password.length() < 8 || !password.matches(PASSWORD_REGEX)) {
            throw new ValidationException("Password must be at least 8 characters long and contain at least 1 upper case, 1 lower case letter, and 1 number");
        }

        User user = new User();
        user.setUsername(email);
        user.setEmail(email);
        user.setFirstName(cmd.getFirstName());
        user.setLastName(cmd.getLastName());
        user.setPassword(passwordEncoder.encode(cmd.getPassword()));
        user.setCountryName(cmd.getCountryName());

        user.getUserRoles().add(UserRole.builder().role(Role.EMPLOYEE).user(user).build());


        User savedUser = userRepository.save(user);

        Profile profile = profileService.createProfile(savedUser);
        savedUser.setProfile(profile);

        return new UserRecord(
                savedUser.getId(),
                savedUser.getEmail(),
                savedUser.getFirstName(),
                savedUser.getLastName(),
                savedUser.getCountryName(),
                savedUser.getProfile().getTotalVacationDays(),
                savedUser.getProfile().getTotalSpentVacationDays(),
                Collections.singletonList(Role.EMPLOYEE));
    }
}

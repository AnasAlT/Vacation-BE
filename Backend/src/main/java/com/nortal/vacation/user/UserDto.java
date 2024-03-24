package com.nortal.vacation.user;

import java.util.List;

public record UserDto(String username, String email, String firstName, String lastName, List<Role> roles) {

    public static UserDto of(User user) {
        return new UserDto(
            user.getUsername(),
            user.getEmail(),
            user.getFirstName(),
            user.getLastName(),
            user.getUserRoles().stream().map(UserRole::getRole).toList());
    }
}

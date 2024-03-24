package com.nortal.vacation.security;

import lombok.Data;

@Data
public class SignupCmd {

    private String email;
    private String firstName;
    private String password;
    private String lastName;
    private String countryName;
}

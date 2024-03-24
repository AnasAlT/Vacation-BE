package com.nortal.vacation.security;

import lombok.Data;

@Data
public class AuthenticationCmd {

    private String username;
    private String password;
}

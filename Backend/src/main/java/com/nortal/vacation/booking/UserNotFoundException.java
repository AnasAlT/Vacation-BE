package com.nortal.vacation.booking;

public class UserNotFoundException extends Throwable {
    public UserNotFoundException() {
    }

    public UserNotFoundException(String message) {
        super(message);
    }
}

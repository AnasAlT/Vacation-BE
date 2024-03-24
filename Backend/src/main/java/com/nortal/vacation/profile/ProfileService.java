package com.nortal.vacation.profile;

import com.nortal.vacation.booking.UserNotFoundException;
import com.nortal.vacation.user.User;
import com.nortal.vacation.user.UserRecord;


public interface ProfileService {
    Profile createProfile(User user);
    UserRecord getProfile() throws UserNotFoundException;
}

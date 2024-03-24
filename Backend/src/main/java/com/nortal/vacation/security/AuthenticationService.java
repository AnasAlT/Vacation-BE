package com.nortal.vacation.security;

import com.nortal.vacation.user.SecurityUser;
import com.nortal.vacation.user.UserRecord;

public interface AuthenticationService {

    AuthenticationRecord authenticate(AuthenticationCmd auth) throws Exception;

    /**
     * @return the authenticated user or throws exception if no authentication.
     */
    SecurityUser getAuthUser();

    UserRecord signup(SignupCmd cmd);
 }

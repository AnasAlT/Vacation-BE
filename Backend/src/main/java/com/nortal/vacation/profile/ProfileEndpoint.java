package com.nortal.vacation.profile;

import com.nortal.vacation.booking.UserNotFoundException;
import com.nortal.vacation.user.UserRecord;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ProfileEndpoint {

    private final ProfileService profileService;

    @GetMapping("profile")
    public ResponseEntity<UserRecord> getProfileByUserId() throws UserNotFoundException{
        UserRecord user = profileService.getProfile();

        return ResponseEntity.ok(user);

    }

}

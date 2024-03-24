package com.nortal.vacation.security;

import com.nortal.vacation.user.UserRecord;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/um/v1/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthenticationEndpoint {

    private final AuthenticationService authenticationService;

    @Operation(
            summary = "Authenticates the user",
            description = "Authenticates the user and returns a jwt token",
            responses = {
                    @ApiResponse(responseCode = "200", description = "User authenticated successfully"),
                    @ApiResponse(responseCode = "401", description = "Invalid authentication credentials")
            }
    )
    @PostMapping(path = "auth", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ResponseEntity<AuthenticationRecord> authenticate(AuthenticationCmd auth) throws Exception {
        return ResponseEntity.ok(authenticationService.authenticate(auth));
    }

    @PostMapping
    public ResponseEntity<UserRecord> signUp(@RequestBody SignupCmd cmd) {
        return ResponseEntity.ok(authenticationService.signup(cmd));
    }

    @GetMapping("admins")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<String> admins() {
        return ResponseEntity.ok("Admin test endpoint");
    }

    @GetMapping("employees")
    @PreAuthorize("hasAnyAuthority('EMPLOYEE', 'ADMIN')")
    public ResponseEntity<String> employees() {
        return ResponseEntity.ok("Employee test endpoint");
    }
}


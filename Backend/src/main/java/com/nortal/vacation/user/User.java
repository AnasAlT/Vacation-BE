package com.nortal.vacation.user;

import com.nortal.vacation.profile.Profile;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "um_user")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @SequenceGenerator(name = "userIdGenerator", sequenceName = "seq_um_user_id", initialValue = 10000, allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "userIdGenerator")
    @Column(name = "ID", nullable = false, unique = true, insertable = false, updatable = false)
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "username", unique = true)
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "email")
    private String email;

    @Column(name = "nationality")
    private String countryName;

    @Builder.Default
    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<UserRole> userRoles = new ArrayList<>();

    @OneToOne(mappedBy = "user", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Profile profile;

    public SecurityUser toSecurityUser() {
        List<SimpleGrantedAuthority> simpleGrantedAuthorities =
                userRoles.stream().map(ur -> new SimpleGrantedAuthority(ur.getRole().name())).toList();
        return SecurityUser
                .builder()
                .withUserName(username)
                .withPassword(password)
                .withGrantedAuthorityList(simpleGrantedAuthorities);
    }
}


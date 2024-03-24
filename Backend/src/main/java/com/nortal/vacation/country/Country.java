package com.nortal.vacation.country;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.List;

import com.nortal.vacation.user.User;

@Entity
@Getter
@Setter
@Table(name = "country")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Country {

    @Id
    @SequenceGenerator(name = "countryIdGenerator", sequenceName = "seq_country_id", initialValue = 10000, allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "countryIdGenerator")
    @Column(name = "id", nullable = false, unique = true, insertable = false, updatable = false)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "country_name")
    private String countryName;

    @Column(name = "vacation_days")
    private Integer vacationDays; // Default vacation days based on nationality

}

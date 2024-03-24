package com.nortal.vacation.profile;

import com.nortal.vacation.user.User;
import lombok.*;

import jakarta.persistence.*;
import org.springframework.web.bind.annotation.CrossOrigin;

@Entity
@Getter
@Setter
@Table(name = "profile")
@NoArgsConstructor
@AllArgsConstructor
public class Profile {

    @Id
    @SequenceGenerator(name = "profileIdGenerator", sequenceName = "seq_profile_id", initialValue = 10000, allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "profileIdGenerator")
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "total_vacation_days")
    private Integer totalVacationDays;

    @Column(name = "total_spent_vacation_days")
    private Integer totalSpentVacationDays;


}

package com.nortal.vacation.user;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "um_user_role")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserRole {

    @Id
    @SequenceGenerator(name = "userRoleIdGenerator", sequenceName = "seq_um_user_role_id", initialValue = 10000, allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "userRoleIdGenerator")
    @Column(name = "id", nullable = false, unique = true, insertable = false, updatable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Enumerated(value = EnumType.STRING)
    private Role role;
}

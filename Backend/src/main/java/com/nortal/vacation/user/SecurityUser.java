package com.nortal.vacation.user;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class SecurityUser implements UserDetails {

    private String userName;
    private String password;
    private List<SimpleGrantedAuthority> grantedAuthorityList;

    public static SecurityUser builder() {
        return new SecurityUser();
    }

    public SecurityUser withGrantedAuthorityList(List<SimpleGrantedAuthority> grantedAuthorityList) {
        this.grantedAuthorityList = grantedAuthorityList;
        return this;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.grantedAuthorityList;
    }

    public SecurityUser withPassword(String password) {
        this.password = password;
        return this;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    public SecurityUser withUserName(String userName) {
        this.userName = userName;
        return this;
    }

    @Override
    public String getUsername() {
        return this.userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}

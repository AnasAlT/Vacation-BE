package com.nortal.vacation.config;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.apache.catalina.authenticator.SavedRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.NoHandlerFoundException;

import java.io.IOException;
import java.util.NoSuchElementException;

@Component
public class AuthenticationEntryPoint extends Http403ForbiddenEntryPoint {

    @Autowired
    private HttpRequestEndpointChecker endpointChecker;

    @Autowired
    @Qualifier("handlerExceptionResolver")
    HandlerExceptionResolver resolver;

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        if (!endpointChecker.isEndpointExist(request)) {
            String uri = (String) request.getAttribute(RequestDispatcher.ERROR_REQUEST_URI);
            NoSuchElementException noHandlerFoundException = new NoSuchElementException();
            resolver.resolveException(request, response, null, noHandlerFoundException);
        } else {
            resolver.resolveException(request, response, null, authException);
        }
    }


}
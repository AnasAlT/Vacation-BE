package com.nortal.vacation.config;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.DispatcherServlet;
import org.springframework.web.servlet.HandlerExecutionChain;
import org.springframework.web.servlet.HandlerMapping;

@Component
public class HttpRequestEndpointChecker {

    private final DispatcherServlet servlet;

    public HttpRequestEndpointChecker(DispatcherServlet servlet) {
        this.servlet = servlet;
    }

    public boolean isEndpointExist(HttpServletRequest request) {

        assert servlet.getHandlerMappings() != null;

        for (HandlerMapping handlerMapping : servlet.getHandlerMappings()) {
            try {
                HandlerExecutionChain foundHandler = handlerMapping.getHandler(request);
                if (foundHandler != null) {
                    return true;
                }
            } catch (Exception e) {
                return false;
            }
        }
        return false;
    }
}
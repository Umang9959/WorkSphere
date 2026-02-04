package com.umang.ems_backend.service;

import com.umang.ems_backend.dto.AuthResponse;
import com.umang.ems_backend.dto.LoginRequest;
import com.umang.ems_backend.dto.RegisterRequest;

public interface AuthService {
    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);
}

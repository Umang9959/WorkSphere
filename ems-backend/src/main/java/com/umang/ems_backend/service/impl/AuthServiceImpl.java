package com.umang.ems_backend.service.impl;

import com.umang.ems_backend.dto.AuthResponse;
import com.umang.ems_backend.dto.LoginRequest;
import com.umang.ems_backend.dto.RegisterRequest;
import com.umang.ems_backend.entity.AppUser;
import com.umang.ems_backend.exception.DuplicateResourceException;
import com.umang.ems_backend.exception.UnauthorizedException;
import com.umang.ems_backend.repository.AppUserRepository;
import com.umang.ems_backend.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public AuthResponse register(RegisterRequest request) {
        String email = request.getEmail() == null ? "" : request.getEmail().trim();
        String password = request.getPassword() == null ? "" : request.getPassword().trim();
        if (email.isEmpty() || password.isEmpty()) {
            throw new IllegalArgumentException("Email and password are required");
        }

        if (appUserRepository.findByEmailIgnoreCase(email).isPresent()) {
            throw new DuplicateResourceException("Email already taken");
        }

        AppUser user = new AppUser();
        user.setEmail(email);
        user.setPasswordHash(passwordEncoder.encode(password));
        user.setRole(request.getRole() == null || request.getRole().trim().isEmpty() ? "USER" : request.getRole().trim());

        AppUser savedUser = appUserRepository.save(user);
        return new AuthResponse("Registration successful", savedUser.getEmail());
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        String email = request.getEmail() == null ? "" : request.getEmail().trim();
        String password = request.getPassword() == null ? "" : request.getPassword().trim();
        if (email.isEmpty() || password.isEmpty()) {
            throw new UnauthorizedException("Invalid email or password");
        }

        AppUser user = appUserRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new UnauthorizedException("Invalid email or password"));

        if (!passwordEncoder.matches(password, user.getPasswordHash())) {
            throw new UnauthorizedException("Invalid email or password");
        }

        return new AuthResponse("Login successful", user.getEmail());
    }
}

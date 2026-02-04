package com.umang.ems_backend.config;

import com.umang.ems_backend.entity.AppUser;
import com.umang.ems_backend.repository.AppUserRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@AllArgsConstructor
public class UserSeedConfig {

    @Bean
    public CommandLineRunner seedDefaultUser(AppUserRepository appUserRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            String email = "umang@gmail.com";
            if (appUserRepository.findByEmailIgnoreCase(email).isEmpty()) {
                AppUser user = new AppUser();
                user.setEmail(email);
                user.setPasswordHash(passwordEncoder.encode("umang9959"));
                user.setRole("ADMIN");
                appUserRepository.save(user);
            }
        };
    }
}

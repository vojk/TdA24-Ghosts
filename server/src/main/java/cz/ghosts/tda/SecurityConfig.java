package cz.ghosts.tda;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
    httpSecurity
            .authorizeHttpRequests((request) -> request
                    // Allow unrestricted access to specific paths with different HTTP methods
                    .requestMatchers(HttpMethod.POST, "/api/reservation/**", "/api/lecturers/a/id_lektor", "/api/credentials/logout", "/api/credentials/login", "/api/reservation").permitAll()
                    .requestMatchers(HttpMethod.GET, "/**").permitAll()
                    .requestMatchers(HttpMethod.PUT, "/**").permitAll()
                    .requestMatchers(HttpMethod.DELETE, "/**").permitAll()
                    // Require authentication for POST requests to specific paths
                    .requestMatchers(HttpMethod.POST, "/api/lecturers", "/api/lecturers/").hasRole("ADMIN"));

    return httpSecurity.build();
  }

  @Bean
  public InMemoryUserDetailsManager userDetailsService() {
    UserDetails user = User.withDefaultPasswordEncoder()
        .username("TdA")
        .password("d8Ef6!dGG_pv")
        .roles("ADMIN")
        .build();
    return new InMemoryUserDetailsManager(user);
  }

}

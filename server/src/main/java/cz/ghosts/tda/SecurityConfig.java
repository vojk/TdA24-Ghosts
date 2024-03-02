package cz.ghosts.tda;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
    AuthenticationManagerBuilder authenticationManagerBuilder = httpSecurity.getSharedObject(AuthenticationManagerBuilder.class);
    authenticationManagerBuilder.userDetailsService(userDetailsService());
    AuthenticationManager authenticationManager = authenticationManagerBuilder.build();

    httpSecurity.csrf().disable()
            .authorizeRequests((request) -> request
                    // Allow unrestricted access to specific paths with different HTTP methods
                    .requestMatchers(HttpMethod.POST, "/api/reservation/**", "/api/lecturers/a/id_lektor",
                            "/api/credentials/logout", "/api/credentials/login", "/api/reservation")
                    .permitAll()
                    .requestMatchers(HttpMethod.GET, "/**").permitAll()
                    .requestMatchers(HttpMethod.PUT, "/**").permitAll()
                    .requestMatchers(HttpMethod.DELETE, "/**").permitAll()
                    // Require authentication for POST requests to specific paths
                    .requestMatchers(HttpMethod.POST, "/api/lecturers", "/api/lecturers/").authenticated()).authenticationManager(authenticationManager).httpBasic(withDefaults());

    return httpSecurity.build();
  }

  @Bean
  public UserDetailsService userDetailsService() {
    UserDetails user = User.withDefaultPasswordEncoder()
            .username("TdA")
            .password("d8Ef6!dGG_pv")
            .roles("ADMIN")
            .build();
    return new InMemoryUserDetailsManager(user);
  }

}

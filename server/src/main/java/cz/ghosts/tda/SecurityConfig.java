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
    httpSecurity.csrf().disable()
        .authorizeHttpRequests((request) -> request.requestMatchers(HttpMethod.POST).permitAll().requestMatchers(HttpMethod.GET).permitAll().requestMatchers(HttpMethod.DELETE).permitAll());

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

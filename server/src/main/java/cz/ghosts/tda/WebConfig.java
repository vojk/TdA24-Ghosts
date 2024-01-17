package cz.ghosts.tda;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {
  @Override
  public void addCorsMappings(CorsRegistry corsRegistry) {
    corsRegistry.addMapping("/api/**").allowedOrigins("http://localhost:your_frontend_port") // Specify the correct frontend URL
                .allowedMethods("GET", "POST", "PUT", "DELETE");
  }
}

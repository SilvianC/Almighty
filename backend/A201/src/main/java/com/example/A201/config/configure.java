package com.example.A201.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class configure implements WebMvcConfigurer {

    @Configuration
    public class WebConfig implements WebMvcConfigurer {
        @Override
        public void addCorsMappings(CorsRegistry registry) {
            registry.addMapping("/**")
                    .allowedOrigins("https://k9a201.p.ssafy.io","http://k9a201.p.ssafy.io:8080", "http://k9a201.p.ssafy.io")
                    .allowedMethods("PUT", "DELETE","POST","GET")
                    .exposedHeaders("*")
                    .allowCredentials(false).maxAge(3600);
        }
    }
}

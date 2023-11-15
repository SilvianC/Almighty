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
                    .allowedOrigins("https://www.batteryalmighty.co.kr","http://www.batteryalmighty.co.kr:8080", "http://www.batteryalmighty.co.kr")
                    .allowedMethods("PUT", "DELETE","POST","GET")
                    .exposedHeaders("Authorization","Authorization-Refresh")
                    .allowCredentials(true).maxAge(3600);

        }
    }

}

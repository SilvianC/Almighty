package com.example.A201;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class A201Application {

	public static void main(String[] args) {
		SpringApplication.run(A201Application.class, args);
	}

}

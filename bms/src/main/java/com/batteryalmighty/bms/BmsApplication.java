package com.batteryalmighty.bms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@EnableJpaAuditing
@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.batteryalmighty.bms.domain.mysql")
@EnableMongoRepositories(basePackages = "com.batteryalmighty.bms.domain.mongo")
public class BmsApplication {
	public static void main(String[] args) {
		SpringApplication.run(BmsApplication.class, args);
	}

}

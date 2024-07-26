package com.npp.france;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = "com.npp.france")
@EnableJpaRepositories(basePackages = "com.npp.france.repository")
@EntityScan(basePackages = "com.npp.france.entity")
public class FranceApplication {

	public static void main(String[] args) {
		SpringApplication.run(FranceApplication.class, args);
	}

}

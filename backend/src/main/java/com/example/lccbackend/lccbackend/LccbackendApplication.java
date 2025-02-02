package com.example.lccbackend.lccbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class LccbackendApplication {

	public static void main(String[] args) {
		/* System.out.println("DB_URL: " + System.getenv("DB_URL"));
		System.out.println("DB_USER_NAME: " + System.getenv("DB_USER_NAME"));
		System.out.println("DB_PASSWORD: " + System.getenv("DB_PASSWORD")); */
		SpringApplication.run(LccbackendApplication.class, args);
	}

}

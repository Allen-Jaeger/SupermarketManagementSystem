package com.invoicingSystem.main;

import org.activiti.spring.boot.SecurityAutoConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class NovaSupermarketInvoicingSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(NovaSupermarketInvoicingSystemApplication.class, args);
	}
	
}

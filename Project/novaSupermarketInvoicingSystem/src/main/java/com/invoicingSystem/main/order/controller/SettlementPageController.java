package com.invoicingSystem.main.order.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SettlementPageController {
	
	@RequestMapping(value="/settlement")
	public String getSettlementPage() {
		return "index";
	}
	
}

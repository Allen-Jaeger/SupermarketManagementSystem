package com.invoicingSystem.main.indent.controller;

import java.util.ArrayList;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.invoicingSystem.main.commodity.domain.Commodity;
import com.invoicingSystem.main.commodity.service.ICommodityService;
import com.invoicingSystem.main.common.web.ExtjsPageRequest;
import com.invoicingSystem.main.indent.domain.Indent;
import com.invoicingSystem.main.indent.domain.IndentQueryDTO;


@RestController
@RequestMapping(value="/indentCommodity")
public class GetCommodities {

	@Autowired
	private ICommodityService iCommodityService;
	
	
	
	
}

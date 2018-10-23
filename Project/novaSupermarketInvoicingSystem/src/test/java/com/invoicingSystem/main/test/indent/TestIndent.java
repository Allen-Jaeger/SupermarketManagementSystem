package com.invoicingSystem.main.test.indent;

import java.util.Date;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.invoicingSystem.main.commodity.domain.Commodity;
import com.invoicingSystem.main.commodity.service.ICommodityService;
import com.invoicingSystem.main.indent.domain.Indent;
import com.invoicingSystem.main.indent.service.IIndentService;
import com.invoicingSystem.main.indent.util.IndentStatus;
import com.invoicingSystem.main.user.domain.User;
import com.invoicingSystem.main.user.service.IUserService;
import com.invoicingSystem.main.warehouse.service.IWarehouseService;

/**
 * @author LiJuncong
 * at 2018年9月19日
 */
@SpringBootTest
@RunWith(SpringRunner.class)
public class TestIndent {
	@Autowired
	IIndentService indentService;
	@Autowired
	ICommodityService commodityService;
	@Autowired
	IUserService userService;
	@Autowired
	IWarehouseService warehouseService;
	
	
	//@Test
	public void saveIndent() {
		Indent indent = new Indent();
		Commodity c1 = new Commodity();
		User user = userService.findById(3L);
		c1 = commodityService.findById(1L);
		c1.setIndent(indent);
		c1.setId(null);
		indent.getCommodities().add(commodityService.findById(10L));
		commodityService.findById(10L).setIndent(indent);
		indent.setCost(1.0);
		indent.setCreateDate(new Date());
		indent.setCreator(user);
		indent.setIndentNum("BY15312145");
		indent.setIndentStatus(IndentStatus.EXTRACTING);
		indent.setKeeper(userService.findById(1L));
		indent.setManager(user);
		indent.setNote("测试的采购单");
		commodityService.save(c1);
		indent.getCommodities().add(c1);
		indentService.save(indent);
		
	}
	
	
}

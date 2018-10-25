package com.invoicingSystem.main.warehouse.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.apache.commons.collections.IteratorUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.invoicingSystem.main.commodity.domain.Commodity;
import com.invoicingSystem.main.common.web.ExtAjaxResponse;
import com.invoicingSystem.main.indent.domain.Indent;
import com.invoicingSystem.main.warehouse.domain.Warehouse;
import com.invoicingSystem.main.warehouse.service.IWarehouseService;

/**
* @author Lzy
* @version 创建时间：2018年10月9日 上午11:11:10
* 类说明
*/
@RestController
@RequestMapping(value = "/warehouse")
public class WarehouseController {
    @Autowired
    private IWarehouseService warehouseService;
    
    @RequestMapping(value = "/findAll")
    public List<Map<String, String>> findAll() 
    {
        return warehouseService.getAllForMapList(); 
    }
    
    
    //查找仓库下商品存货量
    @RequestMapping(value = "/findCommodityById")
    public List<Map<String, String>> findById(@RequestParam(name = "warehouseId") Long id) {
    	//Long warehouseId = (Long)request.getAttribute("warehouseId");
    	System.out.println("warehouseId"+id);
    	//Warehouse warehouse = new Warehouse();
    	Warehouse warehouse = warehouseService.findById(id);
    	List<Commodity> commodities = warehouse.getCommodities();
    	
    	List<Map<String, String>> returnList = new ArrayList<Map<String,String>>();
    	
    	for(Commodity commodity : commodities) {
    		Map<String, String>  map = new HashMap<String, String>();
    		map.put("name", commodity.getName());
    		map.put("amount", String.valueOf(commodity.getAmount()));
    		returnList.add(map);
    		
    	}
    	
    	return returnList;
    }
    
}
    

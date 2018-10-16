package com.invoicingSystem.main.shop.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.apache.commons.collections.IteratorUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.invoicingSystem.main.common.web.ExtAjaxResponse;
import com.invoicingSystem.main.shop.service.IShopService;
import com.invoicingSystem.main.warehouse.domain.Warehouse;
import com.invoicingSystem.main.warehouse.service.IWarehouseService;

/**
* @author wzh
* @version 创建时间：2018年10月15日 上午10:43:10
* 类说明
*/
@RestController
@RequestMapping(value = "/shop")
public class ShopController {
    @Autowired
    private IShopService shopService;

    //查询所有门店
    @RequestMapping(value = "/findAll")
    public List<Map<String, String>> findAll() 
    {
        return shopService.getAllForMapList();
    }
}

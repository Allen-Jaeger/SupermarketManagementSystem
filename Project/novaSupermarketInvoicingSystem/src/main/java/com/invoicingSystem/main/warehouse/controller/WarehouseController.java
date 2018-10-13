package com.invoicingSystem.main.warehouse.controller;

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

    @PostMapping
    public @ResponseBody ExtAjaxResponse save(Warehouse warehouse) {
          try {  
             
             
            return new ExtAjaxResponse(true, "操作成功!");
        } catch (Exception e) {
            e.printStackTrace();
            return new ExtAjaxResponse(false, "操作失败!");
        }
    }
    
    @PutMapping
    public @ResponseBody ExtAjaxResponse update(Warehouse warehouse) {
        try {
            warehouseService.save(warehouse);
            return new ExtAjaxResponse(true, "操作成功!");
        } catch (Exception e) {
            e.printStackTrace();
            return new ExtAjaxResponse(false, "操作失败!");
        }
    }
    
    @DeleteMapping
    public @ResponseBody ExtAjaxResponse delete(Long id) {
        try {
            Warehouse entity = warehouseService.findById(id);
            if(entity!=null) {
                warehouseService.delete(id);}
            return new ExtAjaxResponse(true, "操作成功!");
        } catch (Exception e) {
            e.printStackTrace();
            return new ExtAjaxResponse(false, "操作失败!");
        }
    }
    
    @RequestMapping(value = "/findAll")
    public List<Map<String, String>> findAll() 
    {
        return warehouseService.getAllForMapList(); 
    }
}

package com.invoicingSystem.main.commodity.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.invoicingSystem.main.commodity.domain.Commodity;
import com.invoicingSystem.main.commodity.domain.CommodityQueryDTO;
import com.invoicingSystem.main.commodity.service.ICommodityService;
import com.invoicingSystem.main.commodity.util.CommodityStatus;
import com.invoicingSystem.main.commodity.util.CommodityType;
import com.invoicingSystem.main.common.web.ExtjsPageRequest;
import com.invoicingSystem.main.warehouse.service.IWarehouseService;





/**
 * @author wzh
 * at 2018年9月27日 上午11:27:22
 * 
 */
@RestController
@RequestMapping(value="/commodity")
public class CommodityController {

		@Autowired
		private ICommodityService CommodityService;
		
		@Autowired
        private IWarehouseService warehouseService;
		
		@GetMapping
		public Page<Commodity> findAll(CommodityQueryDTO commodityQueryDTO ,ExtjsPageRequest pageable){
			Page<Commodity> page;
			commodityQueryDTO.setCommodityStatus(CommodityStatus.ALLOW);
			page = CommodityService.findAll(CommodityQueryDTO.getWhereClause(commodityQueryDTO),pageable.getPageable());
			
			return page;
		}
		
		 @RequestMapping(value = "/findAll1")
			public Page<Commodity> findCommodities(ExtjsPageRequest pageable) {
				
				return CommodityService.findCommodities(CommodityStatus.ALLOW,pageable.getPageable());
			}
		 
		@RequestMapping(value = "/findWarehouse")
        public Page<Commodity> findWareCommodities(CommodityQueryDTO commodityQueryDTO ,ExtjsPageRequest pageable) {
		    
		    Page<Commodity> page;
            commodityQueryDTO.setCommodityStatus(CommodityStatus.SALEABLE);
            System.out.println(commodityQueryDTO.getWarehouseId());
            commodityQueryDTO.setWarehouse(warehouseService.findById(commodityQueryDTO.getWarehouseId()));
            page = CommodityService.findAll(CommodityQueryDTO.getWhereClause(commodityQueryDTO),pageable.getPageable());
            
            return page;
        }

		
}

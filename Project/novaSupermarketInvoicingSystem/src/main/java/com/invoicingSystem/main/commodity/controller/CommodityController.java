package com.invoicingSystem.main.commodity.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.invoicingSystem.main.commodity.domain.Commodity;
import com.invoicingSystem.main.commodity.domain.CommodityQueryDTO;
import com.invoicingSystem.main.commodity.service.ICommodityService;
import com.invoicingSystem.main.commodity.util.CommodityStatus;
import com.invoicingSystem.main.common.web.ExtjsPageRequest;
import com.invoicingSystem.main.shop.service.IShopService;
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
		
		@Autowired
        private IShopService shopService;
		
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
		 
		@RequestMapping(value = "/findCommodities")
        public Page<Commodity> findCommodities(CommodityQueryDTO commodityQueryDTO ,ExtjsPageRequest pageable) {
		    
		    Page<Commodity> page;
            commodityQueryDTO.setCommodityStatus(CommodityStatus.SALEABLE);
            if(commodityQueryDTO.getSearchType().equals("Right"))//右列表查询
            {
                
                if(null!=commodityQueryDTO.getPlaceId()) {
                    System.out.println("Right:"+commodityQueryDTO.getPlaceType()+":"+commodityQueryDTO.getPlaceId());
                    commodityQueryDTO.setWarehouse(warehouseService.findById(commodityQueryDTO.getPlaceId()));
                }
                else {
                    System.out.println("Right:id null");
                }
                commodityQueryDTO.setShop(null);
            }
            else//左列表查询
            {
                if(commodityQueryDTO.getPlaceType().equals("WARE")) {//查询的是仓库
                    System.out.println("Left:"+commodityQueryDTO.getPlaceType()+":"+commodityQueryDTO.getPlaceId());
                    commodityQueryDTO.setWarehouse(warehouseService.findById(commodityQueryDTO.getPlaceId()));
                    commodityQueryDTO.setShop(null);
                }
                else if("SHOP"==commodityQueryDTO.getPlaceType()){//查询的是超市
                    System.out.println("Left:"+commodityQueryDTO.getPlaceType()+":"+commodityQueryDTO.getPlaceId());
                    commodityQueryDTO.setShop(shopService.findById(commodityQueryDTO.getPlaceId()));
                    commodityQueryDTO.setWarehouse(null);
                }
                else {
                    
                }
                commodityQueryDTO.setCommodityType(null);
                commodityQueryDTO.setName(null);
                
            }
            page = CommodityService.findAll(CommodityQueryDTO.getWhereClause(commodityQueryDTO),pageable.getPageable());
            
            return page;
        }

		
}

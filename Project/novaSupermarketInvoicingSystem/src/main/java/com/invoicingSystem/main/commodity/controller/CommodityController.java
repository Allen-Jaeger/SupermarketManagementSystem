package com.invoicingSystem.main.commodity.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.invoicingSystem.main.commodity.domain.Commodity;
import com.invoicingSystem.main.commodity.domain.CommodityDTO;
import com.invoicingSystem.main.commodity.domain.CommodityQueryDTO;
import com.invoicingSystem.main.commodity.service.ICommodityService;
import com.invoicingSystem.main.commodity.util.CommodityStatus;
import com.invoicingSystem.main.commodity.util.CommodityType;
import com.invoicingSystem.main.common.enum_tools.EnumTool;
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
		private ICommodityService commodityService;
		
		@Autowired
        private IWarehouseService warehouseService;
		
		@Autowired
        private IShopService shopService;
		
		@GetMapping
		public Page<Commodity> findAll(CommodityQueryDTO commodityQueryDTO ,ExtjsPageRequest pageable){
			Page<Commodity> page;
			commodityQueryDTO.setCommodityStatus(CommodityStatus.ALLOW);
			page = commodityService.findAll(CommodityQueryDTO.getWhereClause(commodityQueryDTO),pageable.getPageable());
			
			return page;
		}
		
		 @RequestMapping(value = "/findAll1")
			public Page<Commodity> findCommodities(ExtjsPageRequest pageable) {
				
				return commodityService.findCommodities(CommodityStatus.ALLOW,pageable.getPageable());
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
            page = commodityService.findAll(CommodityQueryDTO.getWhereClause(commodityQueryDTO),pageable.getPageable());
            
            return page;
        }

		/**
		 * 返回所有商品类型
		 * @return-键值对队列(index name)
		 */
		@GetMapping(value="/allType")
		public List<Map<String,String>> getAllType(){
			EnumTool et = new EnumTool(CommodityType.class);
			return et.allToMap();
		}
		/**
		 * 分页商品模板DTO 返回符合某些状态的商品DTO
		 * @param pageRequest
		 * @param status 中文含义的数组,为空时返回所有 
		 * @return
		 */
		@GetMapping(value="/allComModel")
		public Page<CommodityDTO> getAllComModel(ExtjsPageRequest pageRequest, String[] status){
			List<CommodityDTO> comDtoList = new ArrayList<>();
			Page<Commodity> comPage = null;
			CommodityQueryDTO commodityQueryDTO = new CommodityQueryDTO();
			if(null != status) {	
				//创建状态集合
//				String[] status = statusStr.split(",");
				EnumTool et = new EnumTool(CommodityStatus.class);
				Set<CommodityStatus> statusSet = new HashSet<>();
				CommodityStatus st;
				for(String name :status) {
					st = (CommodityStatus) et.transToEnum(name);
					if(null != st) {	//检查反射成功
						statusSet.add((CommodityStatus) et.transToEnum(name));
					}
				}
				for(CommodityStatus sts: statusSet) {
					commodityQueryDTO.setCommodityStatus(sts);
					comPage = commodityService.findAll(CommodityQueryDTO.getWhereClause(commodityQueryDTO),pageRequest.getPageable());
					//  转化成DTO类
					for(Commodity com :comPage){
						CommodityDTO dto = new CommodityDTO(com);
						comDtoList.add(dto);
					}
				}
			}else {	//返回所有
				comPage = commodityService.findAll(pageRequest.getPageable());
				for(Commodity com :comPage){
					CommodityDTO dto = new CommodityDTO(com);
					comDtoList.add(dto);
				}
			}
			return new PageImpl<CommodityDTO>(comDtoList,comPage.getPageable(),comPage.getTotalElements());
		}
		
}

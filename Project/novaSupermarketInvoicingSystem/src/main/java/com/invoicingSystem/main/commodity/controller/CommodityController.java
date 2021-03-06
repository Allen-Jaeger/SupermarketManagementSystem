package com.invoicingSystem.main.commodity.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.invoicingSystem.main.commodity.domain.Commodity;
import com.invoicingSystem.main.commodity.domain.CommodityDTO;
import com.invoicingSystem.main.commodity.domain.CommodityQueryDTO;
import com.invoicingSystem.main.commodity.service.ICommodityService;
import com.invoicingSystem.main.commodity.util.CategoryNode;
import com.invoicingSystem.main.commodity.util.CommodityStatus;
import com.invoicingSystem.main.commodity.util.CommodityType;
import com.invoicingSystem.main.common.enum_tools.EnumTool;
import com.invoicingSystem.main.common.web.ExtjsPageRequest;
import com.invoicingSystem.main.shop.service.IShopService;
import com.invoicingSystem.main.warehouse.service.IWarehouseService;

/**
 * @author wzh at 2018年9月27日 上午11:27:22
 * 
 */
@RestController
@RequestMapping(value = "/commodity")
public class CommodityController {

	@Autowired
	private ICommodityService commodityService;

	@Autowired
	private IWarehouseService warehouseService;

	@Autowired
	private IShopService shopService;

	@Value("#{commodityDefaultBean.defComModelPic}")
	private String defPicUrl; // 默认图片

	@GetMapping
	public Page<Commodity> findAll(CommodityQueryDTO commodityQueryDTO, ExtjsPageRequest pageable) {
		
		Page<Commodity> page;
		
		commodityQueryDTO.setCommodityStatus(CommodityStatus.ALLOW);
		
		page = commodityService.findAll(CommodityQueryDTO.getWhereClause(commodityQueryDTO), pageable.getPageable());

		return page;
	}
	
	
	/**
	 * 根据商品类型查找商品分页
	 * @param commodityType
	 * @param currentPage
	 * @param pagesize
	 * @return
	 */
	@GetMapping(value="/listByType" )
	public Map<String,Object> getListByType(@RequestParam(value="commodityType")Integer commodityType ,
			@RequestParam(value="page")Integer currentPage ,
			@RequestParam(value="size")Integer pagesize ,HttpSession session){
		
		Pageable pageable = PageRequest.of(currentPage, pagesize) ;
		
		Map<String,Object> res = new HashMap<String,Object>(); 
		
		//Long userId = Long.parseLong( session.getAttribute("userId").toString() )   ;
		
		res.put("commodityList",commodityService.findByCommodityType(commodityType, pageable) ) ;
		
		return res ;
	}
	
	@GetMapping(value="/search")
	public Map <String,Object> searchCommodities(@RequestParam(value="name")String commodityName ,
			@RequestParam(value="page")Integer currentPage ,
			@RequestParam(value="size")Integer pagesize ) {
		
		Pageable pageable = PageRequest.of(currentPage, pagesize);
		
		Map<String,Object> res = new HashMap<String,Object>(); 
		
		res.put("commodityList",commodityService.findByName(commodityName, pageable) ) ;
		
		return res ;
	}
	

	@RequestMapping(value = "/findAll1")
	public Page<Commodity> findCommodities(ExtjsPageRequest pageable) {

		return commodityService.findCommodities(CommodityStatus.ALLOW, pageable.getPageable());
	}

	@RequestMapping(value = "/findCommodities")
	public Page<Commodity> findCommodities(CommodityQueryDTO commodityQueryDTO, ExtjsPageRequest pageable) {

		Page<Commodity> page;
		commodityQueryDTO.setCommodityStatus(CommodityStatus.SALEABLE);
		if (commodityQueryDTO.getSearchType().equals("Right"))// 右列表查询
		{

			if (null != commodityQueryDTO.getPlaceId()) {
				System.out.println("Right:" + commodityQueryDTO.getPlaceType() + ":" + commodityQueryDTO.getPlaceId());
				commodityQueryDTO.setWarehouse(warehouseService.findById(commodityQueryDTO.getPlaceId()));
			} else {
				System.out.println("Right:id null");
			}
			commodityQueryDTO.setShop(null);
		} else// 左列表查询
		{
			if (commodityQueryDTO.getPlaceType().equals("WARE")) {// 查询的是仓库
				System.out.println("Left:" + commodityQueryDTO.getPlaceType() + ":" + commodityQueryDTO.getPlaceId());
				commodityQueryDTO.setWarehouse(warehouseService.findById(commodityQueryDTO.getPlaceId()));
				commodityQueryDTO.setShop(null);
			} else if (commodityQueryDTO.getPlaceType().equals("SHOP")) {// 查询的是超市
				System.out.println("Left:" + commodityQueryDTO.getPlaceType() + ":" + commodityQueryDTO.getPlaceId());
				commodityQueryDTO.setShop(shopService.findById(commodityQueryDTO.getPlaceId()));
				commodityQueryDTO.setWarehouse(null);
			} else {
			    System.out.println("Left:id null");
			}
			
			commodityQueryDTO.setCommodityType(null);
			commodityQueryDTO.setName(null);

		}
		page = commodityService.findAll(CommodityQueryDTO.getWhereClause(commodityQueryDTO), pageable.getPageable());

		return page;
	}

	/**
	 * 返回所有商品类型
	 * 
	 * @return-键值对队列(index name)
	 */
	@GetMapping(value = "/allType")
	public List<Map<String, String>> getAllType() {
		EnumTool et = new EnumTool(CommodityType.class);
		return et.allToMap();
	}

	/**
	 * 分页商品模板DTO 返回符合某些状态的商品DTO
	 * 
	 * @param pageRequest
	 * @param status      中文含义的数组,为空时返回所有
	 * @return
	 */
	@GetMapping(value = "/allComModel")
	public Page<CommodityDTO> getAllComModel(ExtjsPageRequest pageRequest, String[] status) {
		List<CommodityDTO> comDtoList = new ArrayList<>();
		Page<Commodity> comPage = null;
		CommodityQueryDTO commodityQueryDTO = new CommodityQueryDTO();
		if (null != status) {
			// 创建状态集合
//				String[] status = statusStr.split(",");
			EnumTool et = new EnumTool(CommodityStatus.class);
			Set<CommodityStatus> statusSet = new HashSet<>();
			CommodityStatus st;
			for (String name : status) {
				st = (CommodityStatus) et.transToEnum(name);
				if (null != st) { // 检查反射成功
					statusSet.add((CommodityStatus) et.transToEnum(name));
				}
			}
			for (CommodityStatus sts : statusSet) {
				commodityQueryDTO.setCommodityStatus(sts);
				comPage = commodityService.findAll(CommodityQueryDTO.getWhereClause(commodityQueryDTO),
						pageRequest.getPageable());
				// 转化成DTO类
				for (Commodity com : comPage) {
					CommodityDTO dto = new CommodityDTO(com);
					comDtoList.add(dto);
				}
			}
		} else { // 返回所有
			comPage = commodityService.findAll(pageRequest.getPageable());
			for (Commodity com : comPage) {
				CommodityDTO dto = new CommodityDTO(com);
				comDtoList.add(dto);
			}
		}
		return new PageImpl<CommodityDTO>(comDtoList, comPage.getPageable(), comPage.getTotalElements());
	}

	@PostMapping(value = "/comModelPic")
	public String upload(String comModelBarcode, MultipartFile picFile) {
		if (null == picFile || picFile.isEmpty()) {
			return "{\"success\": true,\"info\":\"上传文件为空文件！\"}";
		}
		Commodity model = commodityService.findComModelByBarcode(Long.parseLong(comModelBarcode));
		String oldUrl = model.getPicUrl();
		String res = commodityService.writePic(model, picFile);
		if (!res.equals("修改成功")) { // 失败
			return "{\"success\": \"true\",\"info\":\"" + res + "\"}";
		}
		// 更新使用模板图片的商品
		model = commodityService.findComModelByBarcode(Long.parseLong(comModelBarcode));
		List<Commodity> comList = commodityService.findAllByBarcode(Long.parseLong(comModelBarcode));
		for (Commodity com : comList) {
			if (com.getPicUrl().equals(oldUrl)) {
				com.setPicUrl(model.getPicUrl());
				commodityService.save(com);
			}
		}
		return "{\"success\": \"true\",\"info\":\"" + res + "<br/>并更新了使用模板图片的商品样图" + "\"}";
	}

	/**
	 * 更新模板
	 * 
	 * @return
	 */
	@PostMapping(value = "/updateModel")
	public String updateModel(CommodityDTO comDto) {
		Commodity model = new Commodity();
		Commodity newModel = comDto.asModel();
		model = commodityService.findComModelByBarcode(comDto.getBarCode());
		if (null != model) {// 更新
			model.setCommodityType(newModel.getCommodityType());
			model.setCommodityStatus(newModel.getCommodityStatus());
			model.setName(newModel.getName());
			model.setSaveStock(newModel.getSaveStock());
			model.setNote(newModel.getNote());
			model.setPrice(newModel.getPrice());
			commodityService.save(model);
			return "{\"success\":\"true\",\"info\":\"已更新当前模板\"}";
		} else {
			newModel.setPicUrl(defPicUrl);
			commodityService.save(newModel);
			return "{\"success\":\"true\",\"info\":\"条形码新增或被修改，已创建新的商品模板\",\"type\":\"add\"}";
		}
	}
	/**
	 * 删除模板
	 * @param barCode
	 * @return
	 */
	@GetMapping(value = "/deleteComModel")
	public String deleteModel(String barCode) {
		if(barCode.equals("")
				||null == commodityService.findComModelByBarcode(Long.parseLong(barCode))) {
			return "{\"success\":\"true\",\"info\":\"此条形码下的商品模板不存在\"}";
		}
		String res = commodityService.deleteComModel(Long.parseLong(barCode));
		return "{\"success\":\"true\",\"info\":\"" +res+ "\"}";
	}
	/**
	 * 	1.所有获取库存
	 * @param pageable
	 * @return
	 */
	@GetMapping(value="/getAllStock")
	public Page<CommodityDTO> getAllStock(ExtjsPageRequest pageable) {
		List<CommodityDTO> dtoList = new ArrayList<>();
		Page<Commodity> entityPage = commodityService.findAllStock(pageable.getPageable());
		for(Commodity com:entityPage) {
			dtoList.add(new CommodityDTO(com));
		}
		return new PageImpl<CommodityDTO>(dtoList,entityPage.getPageable(),entityPage.getTotalElements());
	}
	/**
	 * 1.更新库存特例图片
	 * @param stockId
	 * @param picFile
	 * @return
	 */
	@PostMapping(value="/stockPic")
	public String updateStockPic(Long stockId, MultipartFile picFile) {
		Commodity com = commodityService.findById(stockId);
		if(null == com) {
			return "{\"success\":\"true\",\"info\":\"更新库存特例图片出错！\"}";
		}
		String res = commodityService.writePic(com, picFile);
		return "{\"success\":\"true\",\"info\":\"" +res+ "\"}";
	}
	/**
	 * @return 返回非模板使用的状态
	 */
	@GetMapping(value="/getStockStatus")
	public List<Map<String,String>> getStockStore() {
		List<Map<String,String>> res = new ArrayList<>();
		EnumTool et = new EnumTool(CommodityStatus.class);
		List<Enum<?>> listE = et.getAllEnum();
		for(Enum<?> e:listE) {
			if(e.equals(CommodityStatus.ALLOW) || e.equals(CommodityStatus.UNALLOWED)) {
				listE.remove(e);
			}else {
				res.add(et.getMap(e));
			}
		}
		return res;
	}
	/**
	 *  1.更新库存  部分字段不允许更新
	 * @param stockId
	 * @param comDto
	 * @param periodEx
	 * @return
	 */
	@PostMapping(value="/editStock")
	public String editStock(Long stockId,CommodityDTO comDto, String periodEx) {
		Commodity com = commodityService.findById(stockId);
		if(null == com) {
			return "{\"success\":\"true\",\"info\":\"" +"更新出错"+ "\"}";
		}
		EnumTool et = new EnumTool(CommodityStatus.class);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		try {
			com.setPeriod(sdf.parse(periodEx));
		}catch(Exception e) {}
		com.setName(comDto.getName());
		com.setPrice(comDto.getPrice());
		com.setAmount(comDto.getAmount());
		com.setCommodityStatus((CommodityStatus) et.transToEnum(comDto.getCommodityStatus()));
		com.setNote(comDto.getNote());
		commodityService.save(com);
		return "{\"success\":\"true\",\"info\":\"" +"更新成功"+ "\"}";
	}
	/**
	 * 按id删除库存
	 * @param stockId
	 * @return
	 */
	@GetMapping(value="/delStock")
	public String delStock(Long stockId) {
		String res = commodityService.deleteById(stockId);
		return "{\"success\":\"true\",\"info\":\"" +res+ "\"}";
	}
	
	@GetMapping(value="/findAllModel")
	public CategoryNode findAllModel(ExtjsPageRequest pageable) {
		CategoryNode root = CategoryNode.constructCate();
		List<Commodity> coms = commodityService.findAllComModel();
		for(Commodity com: coms) {
			for(CategoryNode cate:root.getChildren()) {
				if(cate.getText().equals(com.getCommodityType().getChineseName())){
					cate.appendChild(CategoryNode.modelToLeaf(com));
				}
			}
		}
		return root;
	}
}

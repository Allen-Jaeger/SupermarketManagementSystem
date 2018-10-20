package com.invoicingSystem.main.commodity.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.invoicingSystem.main.commodity.domain.Commodity;
import com.invoicingSystem.main.commodity.repository.ICommodityRepository;
import com.invoicingSystem.main.commodity.util.CommodityStatus;
import com.invoicingSystem.main.commodity.util.CommodityType;

/**
 * @author LiJuncong
 * at 2018年9月19日
 */
@Transactional
@Service
public class CommodityService implements ICommodityService {
	@Autowired
	ICommodityRepository commodityRepository;
	@Value("#{commodityDefaultBean.defComModelPic}")
	private String defComUrl; // 默认图片
	
	@Override
	public void save(Commodity commodity) {
		commodityRepository.save(commodity);
	}

	@Override
	public Commodity findById(Long id) {
		return commodityRepository.findById(id).get();
	}
	@Override
	public Page<Commodity> findByCommodityType(CommodityType commodityType,Pageable pageable){
		
		return commodityRepository.findByCommodityType(commodityType,pageable) ;
	}
	@Override
	public Page<Commodity> findAll(Pageable pageable) {
		return commodityRepository.findAll(pageable);
	}

	@Override
	public Page<Commodity> findAll(Specification<Commodity> spec, Pageable pageable) {
		return commodityRepository.findAll(spec,pageable);
	}

	@Override
	public Page<Commodity> findCommodities(CommodityStatus commodityStatus,Pageable pageable) {
		return commodityRepository.findCommodities(commodityStatus, pageable);
	}

	@Override
	public Page<Commodity> findCommoditiesByIndentId(Long indentId, Pageable pageable) {
		return commodityRepository.findCommoditiesByIndentId(indentId,pageable); 
	}

	@Override
	public Commodity findByIndentIdAndCommodityName(Long indentId, String commodityName) {
		return (Commodity) commodityRepository.findByIndentIdAndCommodityName(indentId, commodityName);
	}

	@Override
	public void deleteAll(List<Commodity> commodities) {
		for(Commodity commodity :commodities) {
			commodity.setIndent(null);
		}
		commodityRepository.deleteAll(commodities);
		
	}
	
	
	 /**
	  * 上传图片
	  */
	@Override
	public String writePic(Commodity commodity, MultipartFile pic) {
		//判断文件类型是否符合要求
		String[] type = pic.getContentType().split("/");
		if(!type[0].equals("image") || null == type[1]) {
			return "文件类型不能被识别为图片";
		}
		//拼接随机数解决浏览器缓存问题
		String random = String.valueOf(Math.random()).substring(4, 8);
		//文件名字=商品条形码+随机数+文件类型
		String filename = commodity.getBarCode()+ random + "."+type[1];
		//使用System获取项目路径
		String path = System.getProperty("user.dir")+ "\\supermarketInvoicingSystem\\resources\\commodityPic";
		//输入输出流处理(存储+部署)
		//部署路径
		String path2 = System.getProperty("user.dir")+ "\\src\\main\\webapp\\resources\\commodityPic";
		try {
			FileOutputStream fs = new FileOutputStream(path + "/" + filename);
			FileOutputStream fs2 = new FileOutputStream(path2 + "/" + filename);
			byte[] buffer = new byte[1024 * 1024];
			int byteread = 0;
			InputStream is = pic.getInputStream();
			while ((byteread= is.read(buffer))!=-1) {
				fs.write(buffer,0,byteread);
		        fs.flush();
		        fs2.write(buffer,0,byteread);
		        fs2.flush();
			}
	        fs.close();
	        fs2.close();
	        is.close();
		} catch (Exception e) {
			
		}
		//图片不为默认时，删除旧文件
		if(!commodity.getPicUrl().equals(defComUrl)) {
			File oldIcon = new File(path + "/" + commodity.getPicUrl());
			File oldIcon2 = new File(path2 + "/" + commodity.getPicUrl());
			if(oldIcon.exists()) {
				oldIcon.delete();
			}
			if(oldIcon2.exists()) {
				oldIcon2.delete();
			}
		}
		//更新用户信息
		commodity.setPicUrl(filename);
		commodityRepository.save(commodity);
		return "修改成功";
	}

	/* (non-Javadoc)
	 * 查找所有商品 包括模板在内
	 */
	@Override
	public List<Commodity> findAllByBarcode(Long barcode) {
		return commodityRepository.findAllByBarcode(barcode);
	}

	/* (non-Javadoc)
	 * 
	 */
	@Override
	public Commodity findComModelByBarcode(Long barCode) {
		return commodityRepository.findComModelByBarcode(barCode, CommodityStatus.ALLOW, CommodityStatus.UNALLOWED);
	}

	/* (non-Javadoc)
	 * 1.删除商品模板
	 */
	@Override
	public String deleteComModel(Long barcode) {
		String res = "删除成功";
		List<Commodity> coms = commodityRepository.findAllByBarcode(barcode);
		if(coms.size() > 1) {
			return "删除失败，此商品模板下仍存在库存";
		}
		commodityRepository.delete(coms.get(0));
		return res;
	}

	/* (non-Javadoc)
	 * 获取库存信息
	 */
	@Override
	public Page<Commodity> findAllStock(Pageable pageable) {
		return commodityRepository.findAllStock(CommodityStatus.ALLOW, CommodityStatus.UNALLOWED, pageable);
	}
	
	
}

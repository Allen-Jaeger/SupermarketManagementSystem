package com.invoicingSystem.main.commodity.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * @author LiJuncong
 * at 2018年10月10日
 */
@Component
public class CommodityDefaultBean {

	@Value("empty.jpg")
	public String defComModelPic;

}

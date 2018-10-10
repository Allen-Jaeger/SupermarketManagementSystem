package com.invoicingSystem.main.user.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * @author LiJuncong
 * at 2018年10月10日
 */
@Component
public class UserDefaultBean {
	@Value("123456")
	private String defPassword;
	@Value("defaultUser.jpg")
	private String defIconUrl;
	
	
	public String getDefPassword() {
		return defPassword;
	}
	public String getDefIconUrl() {
		return defIconUrl;
	}
	public void setDefPassword(String defPassword) {
		this.defPassword = defPassword;
	}
	public void setDefIconUrl(String defIconUrl) {
		this.defIconUrl = defIconUrl;
	}
}

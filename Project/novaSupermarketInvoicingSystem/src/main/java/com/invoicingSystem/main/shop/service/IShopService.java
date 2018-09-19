package com.invoicingSystem.main.shop.service;

import com.invoicingSystem.main.shop.domain.Shop;

/**
 * @author LiJuncong
 * at 2018年9月19日
 */

public interface IShopService {
	public void save(Shop shop);
	public Shop findById(Long id);
}

package com.invoicingSystem.main.deal.service;

import com.invoicingSystem.main.deal.domain.Deal;

/**
 * @author LiJuncong
 * at 2018年9月19日
 */

public interface IDealService {
	public void save(Deal deal);
	public Deal findById(Long id);
}

package com.invoicingSystem.main.vipcard.service;

import com.invoicingSystem.main.vipcard.domain.VipCard;

/**
 * @author LiJuncong
 * at 2018年9月19日
 */

public interface IVipCardService {
	public void save(VipCard vipCard);
	public VipCard findById(Long id);
}

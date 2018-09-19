package com.invoicingSystem.main.vipcard.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.invoicingSystem.main.vipcard.domain.VipCard;

/**
 * @author LiJuncong
 * at 2018年9月19日
 */
@Repository
public interface IVipCardRepository extends PagingAndSortingRepository<VipCard, Long>{

}

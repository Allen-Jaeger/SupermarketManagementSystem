package com.invoicingSystem.main.commodity.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.invoicingSystem.main.commodity.domain.Commodity;

/**
 * @author LiJuncong
 * at 2018年9月19日
 */

public interface ICommodityRepository extends PagingAndSortingRepository<Commodity, Long>{

}

package com.invoicingSystem.main.shop.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.invoicingSystem.main.shop.domain.Shop;

/**
 * @author LiJuncong
 * at 2018年9月19日
 */
@Repository
public interface IShopRepository extends PagingAndSortingRepository<Shop, Long>{

}

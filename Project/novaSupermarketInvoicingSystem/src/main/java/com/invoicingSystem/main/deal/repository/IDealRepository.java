package com.invoicingSystem.main.deal.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.invoicingSystem.main.deal.domain.Deal;

/**
 * @author LiJuncong
 * at 2018年9月19日
 */
@Repository
public interface IDealRepository extends PagingAndSortingRepository<Deal, Long>{

}

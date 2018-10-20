package com.invoicingSystem.main.order.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.invoicingSystem.main.order.domain.OrderInfo;

@Repository
public interface OrderInfoRepository extends JpaRepository<OrderInfo, Long>{
	
}

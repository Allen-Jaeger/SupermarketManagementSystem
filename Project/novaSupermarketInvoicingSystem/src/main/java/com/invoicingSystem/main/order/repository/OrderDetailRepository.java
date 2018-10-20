package com.invoicingSystem.main.order.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.invoicingSystem.main.order.domain.OrderDetail;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {
	public List<OrderDetail> findByOrderId(String orderId);
}

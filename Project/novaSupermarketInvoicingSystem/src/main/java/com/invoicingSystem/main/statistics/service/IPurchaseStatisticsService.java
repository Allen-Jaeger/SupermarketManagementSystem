package com.invoicingSystem.main.statistics.service;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.domain.Specification;

import com.invoicingSystem.main.indent.domain.Indent;

/**
 * @author Suxj
 * 采购统计 IService
 */
public interface IPurchaseStatisticsService {
	//统计仓库全部商品采购
	public List<Map<String, String>> findAll(Specification<Indent> spec);
}

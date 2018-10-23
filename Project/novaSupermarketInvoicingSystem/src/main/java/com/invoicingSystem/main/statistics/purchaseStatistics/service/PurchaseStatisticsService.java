package com.invoicingSystem.main.statistics.purchaseStatistics.service;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.invoicingSystem.main.indent.domain.Indent;
import com.invoicingSystem.main.indent.repository.IIndentRepository;
/**
 * @author Suxj
 * 采购统计 Service
 */
@Transactional
@Service
public class PurchaseStatisticsService implements IPurchaseStatisticsService {
	@Autowired
	IIndentRepository indentRepository;
	@Override
	public List<Map<String, String>> findAll(Specification<Indent> spec) {
		List<Map<String, String>> list= new ArrayList<Map<String, String>>();
		List<Indent> indentList = indentRepository.findAll(spec);

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
		DecimalFormat decimalFormat = new DecimalFormat("###################.###########");
		Indent indent =null;
		for (int i = 0; i < indentList.size(); i++) {
			indent =indentList.get(i);
			Map<String,String> map = new HashMap<>();
			map.put("time",sdf.format(indent.getCreateDate()));
			if(indent.getCost()!=null) {
				map.put("purchaseAmount", decimalFormat.format(indent.getCost()));
			}else {
				map.put("purchaseAmount", "0");
			}
			list.add(map);
		}
//		System.out.println(decimalFormat.format(null));
		return list;
	}

}

package com.invoicingSystem.main.indent.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.invoicingSystem.main.indent.domain.Indent;
import com.invoicingSystem.main.indent.repository.IIndentRepository;

/**
 * @author LiJuncong
 * at 2018年9月19日
 */
@Transactional
@Service
public class IndentService implements IIndentService {
	@Autowired
	IIndentRepository indentRepository;
	
	@Override
	public void save(Indent indent) {
		// TODO Auto-generated method stub
		indentRepository.save(indent);
	}

	@Override
	public Indent findById(Long id) {
		// TODO Auto-generated method stub
		return indentRepository.findById(id).get();
	}

}

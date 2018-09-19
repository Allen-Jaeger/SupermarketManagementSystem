package com.invoicingSystem.main.indent.service;

import com.invoicingSystem.main.indent.domain.Indent;

/**
 * @author LiJuncong
 * at 2018年9月19日
 */

public interface IIndentService {
	public void save(Indent indent);
	public Indent findById(Long id);
}

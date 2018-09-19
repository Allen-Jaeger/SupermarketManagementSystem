package com.invoicingSystem.main.indent.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.invoicingSystem.main.indent.domain.Indent;

/**
 * @author LiJuncong
 * at 2018年9月19日
 */
@Repository
public interface IIndentRepository extends PagingAndSortingRepository<Indent, Long>{

}

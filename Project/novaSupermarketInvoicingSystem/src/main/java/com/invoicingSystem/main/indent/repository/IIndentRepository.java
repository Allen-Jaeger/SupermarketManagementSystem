package com.invoicingSystem.main.indent.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.invoicingSystem.main.indent.domain.Indent;

/**
 * @author LiJuncong
 * at 2018年9月19日
 * @author lzy
 * at 2018年9月25日 :添加查询语句
 */
@Repository
public interface IIndentRepository extends PagingAndSortingRepository<Indent, Long>,JpaSpecificationExecutor<Indent>{
    
   
}

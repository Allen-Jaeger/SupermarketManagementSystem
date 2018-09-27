package com.invoicingSystem.main.indent.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;
import com.invoicingSystem.main.indent.util.IndentStatus;
import com.invoicingSystem.main.indent.util.IndentType;


/**
* @author Lzy
* @version 创建时间：2018年9月26日 上午9:12:33
* 类说明 : 动态查询DTO类
*/
public class IndentQueryDTO {


    private String indentNum;//货单号
    private IndentStatus indentStatus;//货单进行程度
    private Date createDate;//货单创建日期
    private IndentType indentType;//货单类型
    private Long id;
    
    public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getIndentNum() {
        return indentNum;
    }
    public void setIndentNum(String indentNum) {
        this.indentNum = indentNum;
    }
    public IndentStatus getIndentStatus() {
        return indentStatus;
    }
    public void setIndentStatus(IndentStatus indentStatus) {
        this.indentStatus = indentStatus;
    }
    public Date getCreateDate() {
        return createDate;
    }
    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }
    public IndentType getIndentType() {
        return indentType;
    }
    public void setIndentType(IndentType indentType) {
        this.indentType = indentType;
    }
    
    @SuppressWarnings({ "serial"})
    public static Specification<Indent> getWhereClause(final IndentQueryDTO indentQueryDTO) {
        return new Specification<Indent>() {
            @Override
            public Predicate toPredicate(Root<Indent> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
            
                List<Predicate> predicate = new ArrayList<>();
        
                if (null!=indentQueryDTO.getIndentNum()) {
                    predicate.add(criteriaBuilder.equal(root.get("indentNum").as(String.class),
                            indentQueryDTO.getIndentNum()));
                }
                
                if (null!=indentQueryDTO.getCreateDate()) {
                    predicate.add(criteriaBuilder.greaterThanOrEqualTo(root.get("createDate").as(Date.class),//greaterThanOrEqualTo不知可否.
                            indentQueryDTO.getCreateDate()));
                }
                if (null!=indentQueryDTO.getIndentStatus()) {
                    predicate.add(criteriaBuilder.equal(root.get("indentStatus").as(IndentStatus.class),
                            indentQueryDTO.getIndentStatus()));
                }
                if (null!=indentQueryDTO.getIndentType()) {
                    predicate.add(criteriaBuilder.equal(root.get("indentType").as(IndentType.class),
                            indentQueryDTO.getIndentType()));
                }
                
                Predicate[] pre = new Predicate[predicate.size()];
                return query.where(predicate.toArray(pre)).getRestriction();
            }
        };
    }
    
}

package com.invoicingSystem.main.warehouse.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.invoicingSystem.main.commodity.domain.Commodity;
import com.invoicingSystem.main.user.domain.User;
import com.invoicingSystem.main.util.Department;

/**
 * @author LiJuncong
 * at 2018年9月19日
 */
@Table(name="t_warehouse")
@Entity
public class Warehouse extends Department{

	
	@OneToMany(fetch=FetchType.EAGER, cascade=CascadeType.MERGE)
	@JoinColumn(name="bad_commodities")	//省略中间表
	@Fetch(value=FetchMode.SUBSELECT)
	private List<Commodity> badCommodities = new ArrayList<Commodity>();
	
	@OneToMany(fetch=FetchType.EAGER,cascade=CascadeType.MERGE,mappedBy="warehouse")
	//@JoinColumn(name="commodities")
	@Fetch(value=FetchMode.SUBSELECT)
	private List<Commodity> commodities = new ArrayList<Commodity>();
	
	
	@OneToOne(fetch=FetchType.EAGER,cascade=CascadeType.MERGE)
	@JoinColumn(name="keeper")
//	@Fetch(value=FetchMode.SUBSELECT)
	private User keeper;
	
	
	public List<Commodity> getBadCommodities() {
		return badCommodities;
	}
	public List<Commodity> getCommodities() {
		return commodities;
	}

	public User getKeeper() {
		return keeper;
	}


	public void setBadCommodities(List<Commodity> badCommodities) {
		this.badCommodities = badCommodities;
	}
	public void setCommodities(List<Commodity> commodities) {
		this.commodities = commodities;
	}

	public void setKeeper(User keepers) {
		this.keeper = keepers;
	}

	
}

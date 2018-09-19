package com.invoicingSystem.main.deal.domain;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.invoicingSystem.main.commodity.domain.Commodity;
import com.invoicingSystem.main.user.domain.User;
import com.invoicingSystem.main.vipcard.domain.VipCard;

/**
 * @author LiJuncong
 * at 2018年9月19日
 */
@Entity
@Table(name = "t_deal")
public class Deal {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	@ManyToOne(cascade=CascadeType.MERGE)
	private VipCard vipCard;
	@ManyToOne(cascade=CascadeType.MERGE)
	private User salesman;
	
	@OneToMany(fetch=FetchType.EAGER,cascade=CascadeType.MERGE)
	@JoinColumn(name="sold_deal_id")
	@Fetch(FetchMode.SUBSELECT)
	private List<Commodity> commodities;
	private Double price;	//实际交易额
	private Double cost;	//总进货成本
	
	public Long getId() {
		return id;
	}
	public VipCard getVipCard() {
		return vipCard;
	}
	public User getSalesman() {
		return salesman;
	}
	public List<Commodity> getCommodities() {
		return commodities;
	}
	public Double getPrice() {
		return price;
	}
	public Double getCost() {
		return cost;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public void setVipCard(VipCard vipCard) {
		this.vipCard = vipCard;
	}
	public void setSalesman(User salesman) {
		this.salesman = salesman;
	}
	public void setCommodities(List<Commodity> commodities) {
		this.commodities = commodities;
	}
	public void setPrice(Double price) {
		this.price = price;
	}
	public void setCost(Double cost) {
		this.cost = cost;
	}

}

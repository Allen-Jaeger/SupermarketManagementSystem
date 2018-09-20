package com.invoicingSystem.main.deal.domain;

import java.util.ArrayList;
import java.util.Date;
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

import com.fasterxml.jackson.annotation.JsonFormat;
import com.invoicingSystem.main.commodity.domain.Commodity;
import com.invoicingSystem.main.shop.domain.Shop;
import com.invoicingSystem.main.user.domain.User;
import com.invoicingSystem.main.vipcard.domain.VipCard;

/**
 * @author LiJuncong at 2018年9月19日
 */
@Entity
@Table(name = "t_deal")
public class Deal {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@ManyToOne(cascade = CascadeType.MERGE)
	private VipCard vipCard;
	@ManyToOne(cascade = CascadeType.MERGE)
	private User salesman;

	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
	@JoinColumn(name = "sold_deal_id")
	//@Fetch(FetchMode.SUBSELECT)
	private List<Commodity> commodities = new ArrayList<Commodity>();
	private Double price; // 实际交易额
	private Double cost; // 总进货成本
	private Date dealDate;
	@ManyToOne(cascade = CascadeType.MERGE)
	private Shop shop;


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
	@JsonFormat(pattern="yyyy/MM/dd HH:mm:ss",timezone="GMT+8")
	public Date getDealDate() {
		return dealDate;
	}

	public Shop getShop() {
		return shop;
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
		updateCost();
	}

	public void setDealDate(Date dealDate) {
		this.dealDate = dealDate;
	}

	public void setShop(Shop shop) {
		this.shop = shop;
	}
	/**
	 * 遍历货物，更新成本
	 */
	private void updateCost() {
		this.cost = 0.0;
		for (Commodity commodity:this.commodities) {
			this.cost += (commodity.getCost()* commodity.getAmount());
		}
	}
}

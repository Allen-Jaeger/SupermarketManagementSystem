package com.invoicingSystem.main.shop.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.invoicingSystem.main.commodity.domain.Commodity;
import com.invoicingSystem.main.user.domain.User;
import com.invoicingSystem.main.util.Department;
import com.invoicingSystem.main.util.Location;

/**
 * @author LiJuncong
 * at 2018年9月19日
 */
@Entity
@Table(name="t_shop")
public class Shop extends Department{

	
	@OneToMany(fetch=FetchType.EAGER,cascade=CascadeType.MERGE)
	@JoinColumn(name="shop_commodities")
	@Fetch(value=FetchMode.SUBSELECT)
	private List<Commodity> Commodities = new ArrayList<Commodity>();
	
	@OneToMany(fetch=FetchType.EAGER,cascade=CascadeType.MERGE)
	@JoinColumn(name="shop_sales")
	@Fetch(value=FetchMode.SUBSELECT)
	private List<User> sales = new ArrayList<User>();
	
	@OneToMany(fetch=FetchType.EAGER,cascade=CascadeType.MERGE)
	@JoinColumn(name="shop_manager")
	@Fetch(value=FetchMode.SUBSELECT)
	private List<User> shopManager = new ArrayList<User>();

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public List<Commodity> getCommodities() {
		return Commodities;
	}

	public Location getLocation() {
		return location;
	}

	public List<User> getShopManager() {
		return shopManager;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setCommodities(List<Commodity> commodities) {
		Commodities = commodities;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public void setShopManager(List<User> shopManager) {
		this.shopManager = shopManager;
	}
	
}

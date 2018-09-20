package com.invoicingSystem.main.util;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

/**
 * @author LiJuncong
 * at 2018年9月20日
 */
@MappedSuperclass
public class Department {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	protected Long id;
	protected String name;
	protected Location location;
	
	
	public Long getId() {
		return id;
	}
	public String getName() {
		return name;
	}
	public Location getLocation() {
		return location;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public void setName(String name) {
		this.name = name;
	}
	public void setLocation(Location location) {
		this.location = location;
	}
	
	
}

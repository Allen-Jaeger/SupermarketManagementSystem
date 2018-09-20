package com.invoicingSystem.main.util;

import javax.persistence.Embeddable;

/**
 * @author LiJuncong
 * at 2018年9月19日
 */

/**
 * 经度 东经为+ 西经为-
 * 纬度 北纬为+ 南纬为-
 */
@Embeddable
public class Location {
	double longitude;	//经度 东经为+ 西经为-
	double latitude;	//纬度 北纬为+ 南纬为-
	String address;
	
	public Location() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	/**
	 * 
	 * 经度 东经为+ 西经为-
	 * 纬度 北纬为+ 南纬为-
	 * @param longitude
	 * @param latitude
	 * @param address
	 */
	public Location(double longitude, double latitude, String address) {
		super();
		this.longitude = longitude;
		this.latitude = latitude;
		this.address = address;
	}

	public double getLongitude() {
		return longitude;
	}
	public double getLatitude() {
		return latitude;
	}
	public String getAddress() {
		return address;
	}
	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}
	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}
	public void setAddress(String address) {
		this.address = address;
	}
}

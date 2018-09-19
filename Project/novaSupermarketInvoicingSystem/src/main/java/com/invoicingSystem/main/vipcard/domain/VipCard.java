package com.invoicingSystem.main.vipcard.domain;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * @author LiJuncong
 * at 2018年9月19日
 */
@Entity
@Table(name="t_vipcard")
public class VipCard {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	private Long cardNo;
	private int score;	//积分100分抵扣1元
	private Date openDate;	//开卡日期
	private Double discount = 0.95;//会员默认九五折
	
	public Long getId() {
		return id;
	}
	public Long getCardNo() {
		return cardNo;
	}
	public int getScore() {
		return score;
	}
	@JsonFormat(pattern="yyyy/MM/dd HH:mm:ss",timezone="GMT+8")
	public Date getOpenDate() {
		return openDate;
	}
	public Double getDiscount() {
		return discount;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public void setCardNo(Long cardNo) {
		this.cardNo = cardNo;
	}
	public void setScore(int score) {
		this.score = score;
	}
	public void setOpenDate(Date openDate) {
		this.openDate = openDate;
	}
	public void setDiscount(Double discount) {
		this.discount = discount;
	}
	
	
}

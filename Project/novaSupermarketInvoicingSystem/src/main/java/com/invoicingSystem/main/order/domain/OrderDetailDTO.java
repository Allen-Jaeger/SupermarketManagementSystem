package com.invoicingSystem.main.order.domain;


public class OrderDetailDTO {
	private Long id ;
	//订单号
	private String orderId;
	//商品项id
	private String itemId ;
	//商品名称
	private String itemTitle ;
	//商品数量
	private Integer itemNum ;
	//商品价格
	private Double itemPrice ;
	//商品折扣
	private Double itemDiscount ;
	//商品图片
	private String itemImg ;
	//该项小结
	private Double itemAmout ;
	
	
	public OrderDetail getOrderDetail() {
		
		return null ;
		
	}
	
	
	
	
	
	//Getter And Setter
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getOrderId() {
		return orderId;
	}
	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}
	public String getItemId() {
		return itemId;
	}
	public void setItemId(String itemId) {
		this.itemId = itemId;
	}
	public String getItemTitle() {
		return itemTitle;
	}
	public void setItemTitle(String itemTitle) {
		this.itemTitle = itemTitle;
	}
	public Integer getItemNum() {
		return itemNum;
	}
	public void setItemNum(Integer itemNum) {
		this.itemNum = itemNum;
	}
	public Double getItemPrice() {
		return itemPrice;
	}
	public void setItemPrice(Double itemPrice) {
		this.itemPrice = itemPrice;
	}
	public Double getItemDiscount() {
		return itemDiscount;
	}
	public void setItemDiscount(Double itemDiscount) {
		this.itemDiscount = itemDiscount;
	}
	public String getItemImg() {
		return itemImg;
	}
	public void setItemImg(String itemImg) {
		this.itemImg = itemImg;
	}
	public Double getItemAmout() {
		return itemAmout;
	}
	public void setItemAmout(Double itemAmout) {
		this.itemAmout = itemAmout;
	}
}

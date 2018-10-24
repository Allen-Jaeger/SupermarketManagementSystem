package com.invoicingSystem.main.commodity.util;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.invoicingSystem.main.commodity.domain.Commodity;
import com.invoicingSystem.main.common.enum_tools.EnumTool;

/**
 * @author LiJuncong
 * at 2018年10月24日
 */

public class CategoryNode {
	boolean expended = false;
    Long index;
    String text;
    boolean leaf = true;
    List<CategoryNode> children = new ArrayList<>();
    
    /**
	 * @param expended
	 * @param index
	 * @param name
	 * @param text
	 * @param leaf
	 * @param children
	 */
	public CategoryNode(boolean expended, Long index, String text, boolean leaf) {
		super();
		this.expended = expended;
		this.index = index;
		this.text = text;
		this.leaf = leaf;
	}
	public CategoryNode() {
		super();
	}

	public void appendChild(CategoryNode node) {
    	this.children.add(node);
    }
	
	public static CategoryNode modelToLeaf(Commodity com) {
		CategoryNode cate = new CategoryNode();
		cate.setIndex(com.getBarCode());
		cate.setText(com.getName());
		return cate; 
	}
	
    public static CategoryNode constructCate() {
    	CategoryNode root = new CategoryNode(true, 0L, "root", false);
    	EnumTool et = new EnumTool(CommodityType.class);
    	List<Map<String,String>> list = et.allToMap();
    	for(Map<String,String> map :list) {
    		CategoryNode cate = new CategoryNode();
    		cate.setText(map.get("name"));
    		cate.setLeaf(false);
    		cate.setExpended(true);
    		root.appendChild(cate);
    	}
    	return root;
    }

	public boolean isExpended() {
		return expended;
	}

	public Long getIndex() {
		return index;
	}

	public String getText() {
		return text;
	}

	public boolean isLeaf() {
		return leaf;
	}

	public List<CategoryNode> getChildren() {
		return children;
	}

	public void setExpended(boolean expended) {
		this.expended = expended;
	}

	public void setIndex(Long index) {
		this.index = index;
	}

	public void setText(String text) {
		this.text = text;
	}

	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}

	public void setChildren(List<CategoryNode> children) {
		this.children = children;
	}
}

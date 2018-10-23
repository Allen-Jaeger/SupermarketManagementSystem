package com.invoicingSystem.main.user.util;

import java.util.ArrayList;
import java.util.List;

import com.invoicingSystem.main.user.domain.User;

/**
 * @author LiJuncong
 * at 2018年10月22日
 */

public class MenuNode {
	private boolean expanded;
	private String iconCls;
	private String text;
	private String viewType;
	private String routeId;
	private boolean leaf;
	private boolean selectable;
	private Privilege pri;
	private List<MenuNode> children = new ArrayList<>();
	
	/**
	 * @param expanded
	 * @param children
	 * @param iconCls
	 * @param text
	 * @param viewType
	 * @param routeId
	 * @param leaf
	 * @param selectable
	 */
	public MenuNode(boolean expanded,String iconCls, String text, String viewType,
			String routeId, boolean leaf, boolean selectable, Privilege privilege) {
		super();
		this.expanded = expanded;
		this.iconCls = iconCls;
		this.text = text;
		this.viewType = viewType;
		this.routeId = routeId;
		this.leaf = leaf;
		this.selectable = selectable;
		this.pri = privilege;
	}

	public void addChild(User user, MenuNode mn) {
		if(!user.hasPrivilege(mn.getPri())) {
			return;
		}
		this.children.add(mn);
	}
	
	public boolean isExpanded() {
		return expanded;
	}

	public List<MenuNode> getChildren() {
		return children;
	}

	public String getIconCls() {
		return iconCls;
	}

	public String getText() {
		return text;
	}

	public String getViewType() {
		return viewType;
	}

	public String getRouteId() {
		return routeId;
	}

	public boolean isLeaf() {
		return leaf;
	}

	public boolean isSelectable() {
		return selectable;
	}
	public Privilege getPri() {
		return pri;
	}
	public void setExpanded(boolean expanded) {
		this.expanded = expanded;
	}

	public void setChildren(List<MenuNode> children) {
		this.children = children;
	}

	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}

	public void setText(String text) {
		this.text = text;
	}

	public void setViewType(String viewType) {
		this.viewType = viewType;
	}

	public void setRouteId(String routeId) {
		this.routeId = routeId;
	}

	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}

	public void setSelectable(boolean selectable) {
		this.selectable = selectable;
	}

	public void setPri(Privilege pri) {
		this.pri = pri;
	}
	
}

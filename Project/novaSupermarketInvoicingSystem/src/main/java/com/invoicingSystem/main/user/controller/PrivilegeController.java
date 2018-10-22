package com.invoicingSystem.main.user.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.invoicingSystem.main.user.util.MenuNode;

/**
 * @author LiJuncong
 * at 2018年10月22日
 */
@RestController
@RequestMapping("/")
public class PrivilegeController {
	@GetMapping(value="/getMenu")
	public MenuNode getMenu() {
		/**
		 * menuNode 构造函数
		 * @param expanded iconCls text viewType routeId leaf select_able
		 */
		MenuNode root = new MenuNode(true, null, null, null, null, false, false);
		MenuNode home = new MenuNode(true, "x-fa fa-desktop", "首页", "admindashboard", "dashboard", true, true);
		MenuNode wkDef = new MenuNode(false, "x-fa fa-font-awesome", "流程定义模块", "processDefinitionCenterPanel", null, true, true);
		MenuNode indent = new MenuNode(false, "x-fa fa-leanpub", "货单模块", null, null, false, false);
		MenuNode indent1 = new MenuNode(false, "x-fa fa-file-o", "货单申请模块", "indentCenterPanel", null, true, true);
		MenuNode indent2 = new MenuNode(false, "x-fa fa-shopping-cart", "货单工作流模块", "indentProcessCenterPanel", null, true, true);
		MenuNode com = new MenuNode(false, "x-fa fa-cubes", "商品管理", null, null, false, false);
		MenuNode com1 = new MenuNode(false, "x-fa fa-cube", "管理商品模板", "comModel", null, true, true);
		MenuNode com2 = new MenuNode(false, "x-fa fa-inbox", "校准库存", "stock", null, true, true);
		MenuNode summary = new MenuNode(false, "x-fa fa-area-chart", "统计分析", null, null, false, false);
		MenuNode sum1 = new MenuNode(false, "x-fa fa-line-chart", "采购统计", "purchaseStatisticsPanel", null, true, true);
		MenuNode sum2 = new MenuNode(false, "x-fa fa-bar-chart", "销售统计", "salesStatisticsPanel", null, true, true);
		MenuNode personal = new MenuNode(false, "x-fa fa-user", "我的信息", "personMsg", "personMsg", true, true);
		MenuNode users = new MenuNode(false, "x-fa fa-group", "用户管理", null, null, false, false);
		MenuNode users1 = new MenuNode(false, "x-fa fa-street-view", "管理用户信息", "users", null, true, true);
		MenuNode users2 = new MenuNode(false, "fa fa-bar-chart fa-rotate-90", "职员整体概况", "usersChart", null, true, true);
		
		root.getChildren().add(home);
		root.getChildren().add(wkDef);
		root.getChildren().add(personal);
		
		indent.getChildren().add(indent1);
		indent.getChildren().add(indent2);
		root.getChildren().add(indent);
		
		com.getChildren().add(com1);
		com.getChildren().add(com2);
		root.getChildren().add(com);
		
		summary.getChildren().add(sum1);
		summary.getChildren().add(sum2);
		root.getChildren().add(summary);
		
		users.getChildren().add(users1);
		users.getChildren().add(users2);
		root.getChildren().add(users);
		
		return root;
	}
}

package com.invoicingSystem.main.user.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.invoicingSystem.main.user.domain.User;
import com.invoicingSystem.main.user.service.IUserService;
import com.invoicingSystem.main.user.util.MenuNode;
import com.invoicingSystem.main.user.util.Privilege;

/**
 * @author LiJuncong
 * at 2018年10月22日
 */
@RestController
@RequestMapping("/")
public class PrivilegeController {
	@Autowired
	IUserService userService;
	
	@GetMapping(value="/getMenu")
	public MenuNode getMenu(HttpSession session) {
		Long userId = Long.parseLong(session.getAttribute("userId").toString());
		User user = userService.findById(userId);
		/**
		 * menuNode 构造函数
		 * @param expanded iconCls text viewType routeId leaf select_able
		 */
		MenuNode root = new MenuNode(true, null, null, null, null, false, false,null);
		MenuNode home = new MenuNode(true, "x-fa fa-desktop", "首页", "admindashboard", "dashboard", true, true,null);
		MenuNode wkDef = new MenuNode(false, "x-fa fa-font-awesome", "流程定义模块", "processDefinitionCenterPanel", null, true, true,Privilege.ALL);
		MenuNode indent = new MenuNode(false, "x-fa fa-leanpub", "货单模块", null, null, false, false,Privilege.CHECK_INDENT);
		MenuNode indent1 = new MenuNode(false, "x-fa fa-file-o", "货单申请模块", "indentCenterPanel", null, true, true,Privilege.CHECK_INDENT);
		MenuNode indent2 = new MenuNode(false, "x-fa fa-shopping-cart", "货单工作流模块", "indentProcessCenterPanel", null, true, true,Privilege.CHECK_INDENT);
		MenuNode com = new MenuNode(false, "x-fa fa-cubes", "商品管理", null, null, false, false,Privilege.EDIT_COMMODITY);
		MenuNode com1 = new MenuNode(false, "x-fa fa-cube", "管理商品模板", "comModel", null, true, true,Privilege.EDIT_COMMODITY);
		MenuNode com2 = new MenuNode(false, "x-fa fa-inbox", "校准库存", "stock", null, true, true,Privilege.EDIT_COMMODITY);
		MenuNode summary = new MenuNode(false, "x-fa fa-area-chart", "统计分析", null, null, false, false,Privilege.DIAGRAMS);
		MenuNode sum1 = new MenuNode(false, "x-fa fa-line-chart", "采购统计", "purchaseStatisticsPanel", null, true, true,Privilege.DIAGRAMS);
		MenuNode sum2 = new MenuNode(false, "x-fa fa-bar-chart", "销售统计", "salesStatisticsPanel", null, true, true,Privilege.DIAGRAMS);
		MenuNode personal = new MenuNode(false, "x-fa fa-user", "我的信息", "personMsg", "personMsg", true, true,null);
		MenuNode users = new MenuNode(false, "x-fa fa-group", "用户管理", null, null, false, false,Privilege.EDIT_USER);
		MenuNode users1 = new MenuNode(false, "x-fa fa-street-view", "管理用户信息", "users", null, true, true,Privilege.EDIT_USER);
		MenuNode users2 = new MenuNode(false, "fa fa-bar-chart fa-rotate-90", "职员整体概况", "usersChart", null, true, true,Privilege.DIAGRAMS);
		
		root.addChild(user,home);
		root.addChild(user,wkDef);
		root.addChild(user,personal);
		
		indent.addChild(user,indent1);
		indent.addChild(user,indent2);
		root.addChild(user,indent);
		
		com.addChild(user,com1);
		com.addChild(user,com2);
		root.addChild(user,com);
		
		summary.addChild(user,sum1);
		summary.addChild(user,sum2);
		root.addChild(user,summary);
		
		users.addChild(user,users1);
		users.addChild(user,users2);
		root.addChild(user,users);
		
		return root;
	}
}

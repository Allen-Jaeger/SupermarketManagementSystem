﻿Ext.define('SupermarketInvoicingSystem.view.indent.IndentViewModel', 
	{extend:Ext.app.ViewModel, 
	alias:'viewmodel.indentViewModel', 
	stores:{
		indentLists:{type:'indentStore'}, 
		commodityList:{type:'commoditiesStore'}, 
		leftList:{type:'leftStore'}
	}
	}
);
Ext.define('SupermarketInvoicingSystem.store.indent.LeftStore', {
	extend:Ext.data.ArrayStore, 
	alias:'store.leftStore', 
	fields:['name', 'num'], 
	storeId:'leftStore', 
	data:[]
});
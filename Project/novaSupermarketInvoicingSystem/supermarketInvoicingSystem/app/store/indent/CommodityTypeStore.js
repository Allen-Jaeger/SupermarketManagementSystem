Ext.define('SupermarketInvoicingSystem.store.indent.CommodityTypeStore', {
    extend: 'Ext.data.ArrayStore',
    alias: 'store.commodityTypeStore',

    fields: [
		 "typeName","Value"        //单id
	],
    storeId: 'commodityTypeStore',

    
});

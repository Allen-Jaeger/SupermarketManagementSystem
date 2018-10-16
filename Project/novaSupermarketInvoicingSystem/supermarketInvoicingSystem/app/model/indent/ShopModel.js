Ext.define('SupermarketInvoicingSystem.model.indent.ShopModel', {
	extend: 'SupermarketInvoicingSystem.model.Base',
	requires: [
			'Ext.data.proxy.Rest'
		],
	fields: [
        {type:'string',name:'name'},
        {type:'string',name:'index'}
	],
	proxy: {
		type: 'rest',
		url: '/shophouse'
	}
});
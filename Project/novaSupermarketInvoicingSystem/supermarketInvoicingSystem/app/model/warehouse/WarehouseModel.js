Ext.define('SupermarketInvoicingSystem.model.warehouse.WarehouseModel', {
    extend: 'SupermarketInvoicingSystem.model.Base',

 	fields: [
    	 {type: 'int' ,name: 'id'}
        ,{type: 'string' ,name: 'address'}
        ,{type: 'int' ,name: 'latitude'}
        ,{type: 'int' ,name: 'longitude'}
        ,{type: 'string' ,name: 'name'}
        ,{type: 'int' ,name: 'keeperId'}
    ]
});

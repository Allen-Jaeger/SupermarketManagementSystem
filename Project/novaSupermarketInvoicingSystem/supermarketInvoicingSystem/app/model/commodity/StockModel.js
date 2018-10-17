Ext.define('SupermarketInvoicingSystem.model.commodity.StockModel', {
    extend: 'SupermarketInvoicingSystem.model.Base',
    // alias: 'model.comModelModel',
 	fields: [
    	{type: 'string' ,name: 'barCode'}
        ,{type: 'string' ,name: 'id'}
        ,{type: 'string' ,name: 'commodityType'}
        ,{type: 'date' ,name: 'period'}
        ,{type: 'string' ,name: 'picUrl'}
        ,{type: 'string' ,name: 'name'}
        ,{type: 'number' ,name: 'amount'}
        ,{type: 'number' ,name: 'cost'}
        ,{type: 'int' ,name: 'saveStock'}
        ,{type: 'number' ,name: 'price'}        
        ,{type: 'string',name: 'note'}
        ,{type: 'string',name: 'commodityStatus'}
        ,{type: 'string',name: 'depName'}
        ,{name: 'sumCost',
            calculate: function (data) {
                return data.cost*data.amount;
            }
        }        
        ,{name: 'sumPrice',
            calculate: function (data) {
                return data.price*data.amount;
            }
        } 
    ]
});

// calculate: function (data) {
//     return data.firstName + ' ' + data.lastName;
// }
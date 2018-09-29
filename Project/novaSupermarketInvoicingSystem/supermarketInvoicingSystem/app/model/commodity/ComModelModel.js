Ext.define('SupermarketInvoicingSystem.model.commodity.ComModelModel', {
    extend: 'SupermarketInvoicingSystem.model.Base',
    //alias: 'model.userMsg.personModel',
 	fields: [
    	 {type: 'string' ,name: 'barCode'}
        ,{type: 'string' ,name: 'commodityType'}
        ,{type: 'string' ,name: 'picUrl'}
        ,{type: 'string' ,name: 'name'}
        ,{type: 'int' ,name: 'saveStock'}
        ,{type: 'number' ,name: 'price'}		
        ,{type: 'string',name: 'note'}
    ]
});
/**
    必要信息：
    private Long barCode;
    private CommodityType commodityType;
    private String name;
    private String picUrl;
    private int saveStock;  //安全库存量，低于这个数值高亮
    private Double price;
    private String note;
*/
Ext.define('SupermarketInvoicingSystem.model.commodity.ComModelModel', {
    extend: 'SupermarketInvoicingSystem.model.Base',
    // alias: 'model.comModelModel',
 	fields: [
    	 {type: 'string' ,name: 'barCode'}
        ,{type: 'string' ,name: 'id'}
        ,{type: 'string' ,name: 'commodityType'}
        ,{type: 'string' ,name: 'period'}
        ,{type: 'string' ,name: 'picUrl'}
        ,{type: 'string' ,name: 'name'}
        ,{type: 'int' ,name: 'saveStock'}
        ,{type: 'number' ,name: 'price'}		
        ,{type: 'string',name: 'note'}
        ,{type: 'string',name: 'commodityStatus'}
    ]
});
/**
    必要信息：
    private Long id;
    private Long barCode;
    private CommodityType commodityType;
    private Date period;    //保质期
    private String name;
    private String picUrl;
    private int saveStock;  //安全库存量，低于这个数值高亮
    private Double price;
    private String note;
    private CommodityStatus commodityStatus;
*/
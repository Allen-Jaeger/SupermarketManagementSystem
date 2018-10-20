Ext.define('SupermarketInvoicingSystem.view.process.indent.IndentProcessViewController', {
  extend: Ext.app.ViewController,
  alias: 'controller.indentProcessViewController',
  
  
  autoAdapting: function (node) {
    var theWindow = node.id;
    var flexWidth = Ext.getCmp(theWindow).width - 160;
    Ext.getCmp('leftList').setWidth(flexWidth * 0.4);
    Ext.getCmp('middleButton').setWidth(flexWidth * 0.1);
    Ext.getCmp('rightList').setWidth(flexWidth * 0.5);
  },
  openIndentProcessLookupWindow: function (grid, rowIndex, colIndex) {
    
    var record = grid.getStore().getAt(rowIndex);
    var store = Ext.data.StoreManager.lookup('leftStore');
    Ext.apply(store.proxy.extraParams, {
      indentId: record.id
    });
    store.load({
      params: {
        start: 0,
        limit: 20,
        page: 1
      }
    });
        var win = grid.up('container').up('container').add(Ext.widget('indentProcessLookupWindow'));
        win.show();

        record.data.toWarehouseName = record.data.toWarehouse.name;
        record.data.creatorName = record.data.creator.name;
        win.down('form').getForm().loadRecord(record);
       
    
  },
  
});
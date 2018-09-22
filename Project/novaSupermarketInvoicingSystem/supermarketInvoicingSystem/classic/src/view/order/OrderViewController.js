Ext.define('SupermarketInvoicingSystem.view.order.OrderViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.orderViewController',
    
	onEditButton:function(grid, rowIndex, colIndex){
		var rec = grid.getStore().getAt(rowIndex);
        Ext.Msg.alert('Title', rec.get('fullname'));
	},
	onDeleteButton:function(grid, rowIndex, colIndex){
		Ext.Msg.alert("Title","Click Delete Button");
	},
	onDisableButton:function(grid, rowIndex, colIndex){
		Ext.Msg.alert("Title","Click Disable Button");
	}
});

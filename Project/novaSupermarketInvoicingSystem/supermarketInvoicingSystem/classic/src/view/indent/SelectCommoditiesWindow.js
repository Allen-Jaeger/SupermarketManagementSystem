
Ext.define('SupermarketInvoicingSystem.view.indent.SelectCommoditiesAddWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.selectcommoditiesAddWindow',
    height: 350,
    minHeight: 350,
    minWidth: 300,
    width: 500,
    scrollable: true,
	closable: true,
    constrain: true,
	defaultFocus: 'textfield',
    modal:true,
    layout: 'fit',
    items: [
		
	]
    ,
	buttons: ['->',{
        xtype: 'button',
        text: 'Submit',
        handler: 'submitAddForm'
    },{
        xtype: 'button',
        text: 'Close',
        handler: function(btn) {
            btn.up('window').close();
        }
    },'->']
});
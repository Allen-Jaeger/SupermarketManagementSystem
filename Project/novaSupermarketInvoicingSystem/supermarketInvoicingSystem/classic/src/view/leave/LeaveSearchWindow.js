Ext.define('SupermarketInvoicingSystem.view.leave.LeaveSearchWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.leaveSearchWindow',
    height: 300,
    minHeight: 300,
    minWidth: 300,
    width: 500,
    scrollable: true,
    title: 'Search More Window',
    closable: true,
    constrain: true,
    defaultFocus: 'textfield',
    modal:true,
    layout: 'fit',
    items: [{
        xtype: 'form',
        layout: 'form',
        padding: '10px',
        ariaLabel: 'Enter your name',
        items: [{
			xtype: 'datefield',
			format: 'Y/m/d H:i:s',
			fieldLabel: 'From',
			name: 'startTime'
		}, {
			xtype: 'datefield',
			format: 'Y/m/d H:i:s',
			fieldLabel: 'To',
			name: 'endTime'
		}]
    }],
	buttons: ['->',{
        xtype: 'button',
        text: 'Submit',
        handler: 'submitSearchForm'
    },{
        xtype: 'button',
        text: 'Close',
        handler: function(btn) {
            btn.up('window').close();
        }
    },'->']
});
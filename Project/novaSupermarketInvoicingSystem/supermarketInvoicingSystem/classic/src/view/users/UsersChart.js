Ext.define('SupermarketInvoicingSystem.view.users.UsersChart', {
    extend: 'Ext.container.Container',
    // viewModel: 'usersViewModel',
    // controller:'usersChartViewController',


    requires: [
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category',
        'Ext.chart.series.Bar',
        'Ext.chart.interactions.ItemHighlight',
        'Ext.chart.theme.Green',
        'Ext.chart.CartesianChart',
        'Ext.draw.Container',
        'Ext.draw.TimingFunctions',
		'Ext.draw.Animator',
    ],
    layout: 'fit',
    xtype: 'usersChart',
    items: [{
    	xtype:'userBarChart',
    }],

});
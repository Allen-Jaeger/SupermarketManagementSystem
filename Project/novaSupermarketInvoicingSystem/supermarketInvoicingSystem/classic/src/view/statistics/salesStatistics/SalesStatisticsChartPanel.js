
Ext.define('SupermarketInvoicingSystem.view.statistics.salesStatistics.SalesStatisticsChartPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'salesStatisticsChartPanel',
    
    requires: [
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.chart.CartesianChart',
        'Ext.chart.grid.HorizontalGrid3D',
        'Ext.chart.grid.VerticalGrid3D',
        'Ext.chart.axis.Numeric3D',
        'Ext.chart.axis.Category3D',
        'Ext.chart.series.Bar3D'
        //'Ext.chart.*' 
        //'Ext.chart.theme.Muted'
    ],
    //layout: 'fit',
    width: 650,

    items: [{
        xtype: 'cartesian',
        width: '100%',
        height: 400,
        captions: {
            title: {
                text: 'Sales in Last Two Years',
                alignTo: 'chart'
            },
            subtitle: {
                text: 'Quarter-wise comparison',
                alignTo: 'chart'
            }
        },
        //theme: 'Muted',
        //interactions: ['itemhighlight'],
        animation: {
            duration: 200
        },
		/*store: {
            type: 'salesStatisticsStore'
        },*/
        bind:'{salesStatisticsLists}',
        legend: {
            type: 'dom',
            docked: 'bottom'
        },
        axes: [{
            type: 'numeric3d',
            position: 'left',
            fields: ['2013', '2014'],
            grid: true,
            title: 'Sales in USD',
            renderer: 'onAxisLabelRender'
        }, {
            type: 'category3d',
            position: 'bottom',
            fields: 'quarter',
            title: {
                text: 'Quarter',
                translationX: -30
            },
            grid: true
        }],
        series: {
            type: 'bar3d',
            stacked: false,
            title: ['Previous Year', 'Current Year'],
            xField: 'quarter',
            yField: ['2013', '2014'],
            label: {
                field: ['2013', '2014'],
                display: 'insideEnd',
                renderer: 'onSeriesLabelRender'
            },
            highlight: true,
            style: {
                inGroupGapWidth: -7
            }
        }
    }, {
        style: 'margin-top: 10px;',
        xtype: 'container',
        layout: {
            type: 'hbox',
            pack: 'center'
        },
        width: '100%',
        items: [{
            xtype: 'gridpanel',
            width: 300,
            columns : {
                defaults: {
                    sortable: false,
                    menuDisabled: true,
                    renderer: 'onGridColumnRender'
                },
                items: [
                    { text: 'Quarter', dataIndex: 'quarter', renderer: Ext.identityFn },
                    { text: '2013', dataIndex: '2013' },
                    { text: '2014', dataIndex: '2014' }
                ]
            },
	        /*store: {
                type: 'two-year-sales'
            }*/
            bind:'{salesStatisticsLists}'
        }]
        //</example>
    }]
    
});

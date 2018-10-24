var userBarChartStore = Ext.create('Ext.data.Store', {
    fields: ['userType', '男','女'],
    proxy: {
        type: 'ajax',
        method: 'GET',
        url: '/getGroupGenderCount',
        reader: {
            type: 'json',
        }
        
    },
    autoLoad: true
});
var userBarChartViewController = Ext.create('Ext.app.ViewController', {
    
    onAxisLabelRender: function (axis, label, layoutContext) {
        return layoutContext.renderer(label);
    },

    onSeriesTooltipRender: function(tooltip, record, item) {
        var fieldIndex = Ext.Array.indexOf(item.series.getYField(), item.field),
            gender = item.series.getTitle()[fieldIndex];

        tooltip.setHtml(record.get('userType')  +','+ gender + '性人数: ' +
            record.get(item.field));
    },

    onPreview: function () {
        if (Ext.isIE8) {
            Ext.Msg.alert('Unsupported Operation', 'This operation requires a newer version of Internet Explorer.');
            return;
        }
        var chart = this.lookup('chart');
        chart.preview();
    },

});

Ext.define('SupermarketInvoicingSystem.view.users.UserBarChart', {
    extend: 'Ext.Panel',
    xtype: 'userBarChart',
    controller: userBarChartViewController,
    requires: [
        'Ext.chart.CartesianChart',
        //'Ext.chart.grid.HorizontalGrid3D',
        //'Ext.chart.grid.VerticalGrid3D',
        'Ext.chart.axis.Numeric3D',
        'Ext.chart.axis.Category3D',
        'Ext.chart.series.Bar3D',
        //'Ext.chart.*' 
        'Ext.chart.theme.Muted'
    ],
    width: '100%',
    padding:'50 100 50 100',

    bodyStyle: 'background: transparent;',

    tbar: ['->', {
        text: '查看大图',
        handler: 'onPreview'
    }],

    items: [{
        xtype: 'cartesian',
        reference: 'chart',
        theme: 'muted',
        captions: {
            title: '职员整体概况'
        },
        height: 400,
        legend: {
            docked: 'right'
        },
        store: userBarChartStore,
        flipXY: true,
        animation: Ext.isIE8 ? false : {
            easing: 'backOut',
            duration: 500
        },
        axes: [{
            type: 'numeric3d',
            position: 'bottom',
            adjustByMajorUnit: true,
            
            
            grid: true,
            renderer: 'onAxisLabelRender',
            minimum: 0,
            title: {
               text: '人数',
               fontSize: 20
           }
        }, {
            type: 'category3d',
            position: 'left',
            grid: true,
            title: {
               text: '职位',
               fontSize: 20
           }
        }],
        series: [{
            type: 'bar3d',
            title: [ '男', '女'],
            xField: 'userType',
            yField: [ '男', '女'],
            stacked: true,
            highlight: true,
            tooltip: {
                trackMouse: true,
                renderer: 'onSeriesTooltipRender'
            }
        }]
    }]
});

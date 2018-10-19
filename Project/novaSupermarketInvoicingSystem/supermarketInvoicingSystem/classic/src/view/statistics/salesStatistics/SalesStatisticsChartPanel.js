
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
        'Ext.chart.series.Bar3D',
        'Ext.chart.series.Pie',
        'Ext.chart.interactions.Rotate',
        'Ext.chart.PolarChart',
	   // 'Ext.chart.theme.Muted',
		'Ext.ux.layout.ResponsiveColumn',
    ],
    //layout: 'fit',
   // width: 650,
	layout: 'responsivecolumn',
	title:'销售统计分析',
		tbar: ['->',{
            xtype: 'combobox',
            reference:'searchShopField',
            hideLabel: true,
            store:Ext.create("Ext.data.Store", {//需更改连接后台获取所有超市
			    fields: ["name", "id"],
			    data:[{name:'Shop01',id:1},{name:'Shop02',id:2},{name:'Shop03',id:3}],
                 proxy: {
			        type: 'memory',
			        /*type: 'ajax',
			        method:'get',
			        url: 'data/ck.json',	//mvc url  xxx.json //data文件夹要放到webapp下//ck连接后台需要改
				    */
				    reader:{
				    	type:'json',
				    	//rootProperty:'warehouseLists'//改
				    }
			    },
    			autoLoad: 'true'
			}),
            displayField: 'name',
            valueField:'id',
            //value:'2',
            editable: false,//是否可编辑
            allowBlank:false,//是否为空
            blankText:'不能为空！',
            queryMode: 'local',//改
            triggerAction: 'all',
            emptyText: '请选择超市',
            width: 135
        }, '|',{
			xtype: 'yearfield',
			emptyText: '请输入/选择年份',
			maxValue:new Date(),
			hideLabel: true,
			//editable:false,
			format: 'Y',
			formatText:'',//没有该项鼠标放上去会显示 expected date format Y
			reference:'searchYearField',
			name: 'year'
			//,id:'from_date',
			//vtype: 'daterange'
			
		},'-',{
	        text: '查询',
	        iconCls: 'fa fa-search',
	        handler: 'search'/*function*/
	    },'->'],

    items: [{
	    xtype: 'panel',
	    userCls: 'big-50 small-100',
	    defaults: {
	        width: '100%'
	    },
	    title: '月份销售统计',
    	iconCls: 'x-fa fa-bar-chart',
		ui: 'light',
	    height: 600,
	    
	    tbar: [
	        '->',
	        {
		    	text: 'Preview',
            	handler: 'onPreviewBar3dchart'/*function*/
			},{
	            text: 'Download',
	            handler: 'onDownloadBar3dchart'/*function*/
	        }
	    ],
	    items: [{
	        xtype: 'cartesian',
        	reference: 'bar3dchart',
	        width: '100%',
	        height: 500,
	        captions: {
	            title: {
	                text: '月份销售统计',
	                alignTo: 'chart'
	            }
	        },
	        interactions: ['itemhighlight'],
	        animation: {
	            duration: 200
	        },
	        bind:'{salesStatisticsLists}',//改
	 		/*legend: {
	            type: 'dom',
	            docked: 'bottom'
	        },*/
	        axes: [{
	            type: 'numeric3d',
	            position: 'left',
	            fields: ['monthSales'],
	            grid: true,
	            title: {
	                text: '销售额(元)',
	                translationY: -180
	            },
	            renderer: 'onAxisLabelRender'/*function*/
	        }, {
	            type: 'category3d',
	            position: 'bottom',
	            fields: 'month',
	            title: {
	                text: '月份',
	                translationX: 250
	            },
	            grid: true
	        }],
	        series: {
	            type: 'bar3d',
	            stacked: false,
	            //title: ['当前年份'],
	            xField: 'month',
	            yField: ['monthSales'],
	            label: {
	                field: ['monthSales'],
	                display: 'insideEnd',//outside
	                renderer: 'onSeriesLabelRender'/*function*/
	            },
	            highlight: true,
	            style: {
	                color:'#00BFFF'
	            }
	        }
	    }]
    },{
        xtype: 'panel',
    //	layout: 'fit',
        title: '季度销售统计',
	    iconCls: 'x-fa fa-pie-chart',
	 	ui: 'light',
        defaults: {
	        width: '100%'
	    },
        height: 600,
        userCls: 'big-50 small-100',
	   // width: 650,
	    tbar: [
	        '->',
	        {
	            text: 'Switch Theme',
	            handler: 'onThemeSwitch'/*function*/
		    },{
		    	text: 'Preview',
            	handler: 'onPreviewPiechart'/*function*/
			},{
	            text: 'Download',
	            handler: 'onDownloadPiechart'/*function*/
	        }
	    ],

	    items: [{
	        xtype: 'polar',
	        reference: 'piechart',
	        downloadServerUrl: '//svg.sencha.io',
	        innerPadding: 40,
	        width: '100%',
	        height: 500,
	        bind:'{salesStatisticsPieLists}',//
	        //theme: 'Muted',
	        interactions: ['itemhighlight', 'rotate'],
	        legend: {
	            type: 'sprite',
	            docked: 'bottom'
	        },
	        series: [
	            {
	                type: 'pie',
	                angleField: 'quarterSales',
	                donut: 30,
	                distortion: 0.6,
	                highlight: {
	                    margin: 40
	                },
	                label: {
	                    field: 'quarter',
	                    display: 'outside'
	                },
	                tooltip: {
	                    trackMouse: true,
	                    renderer: 'onSeriesTooltipRender'/*function*/
	                }
	            }
	        ]
	    }]
       
       
    },
    /*
    {
	    xtype: 'panel',
	    userCls: 'big-50 small-100',
	    defaults: {
	        width: '100%'
	    },
	    //height: 600,
	    items: [{
	        xtype: 'cartesian',
	        width: '100%',
	        height: 600,
	        captions: {
	            title: {
	                text: '近两年销售',
	                alignTo: 'chart'
	            }
	        },
	        
	        interactions: ['itemhighlight'],
	        animation: {
	            duration: 200
	        },
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
	    }]
    }
    */
    	
    /*{
        style: 'margin-top: 10px;',
        xtype: 'container',
        layout: {
            type: 'hbox',
            pack: 'center'
        },
        width: '100%',
        items: [{
            xtype: 'gridpanel',
            title:'销售明细',
            width: 650,
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
            bind:'{salesStatisticsLists}'
        }]
    }*/
    ]
    
});

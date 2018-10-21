
Ext.define('SupermarketInvoicingSystem.view.statistics.purchaseStatistics.PurchaseStatisticsChartPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'purchaseStatisticsChartPanel',
    
    requires: [
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        //'Ext.chart.*'
        'Ext.chart.CartesianChart',
        'Ext.chart.interactions.PanZoom',
        'Ext.chart.series.Line',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Time'
        
    ],
    layout: 'fit',
    //width: 650,
    title:'采购统计分析',
  tbar: ['->',{
            xtype: 'combobox',
            reference:'searchCommodityFieldName',
            hideLabel: true,
            store:Ext.create("Ext.data.Store", {
          fields: ["name", "value"],
          data: [
              { name: '全部商品', value: 'all' },
              { name: '商品条形码', value: 'barCode' },
              { name: '商品名称', value: 'commodityName' }
          ]
      }),
            displayField: 'name',
            valueField:'value',
            //value:'barCode',
            editable: false,
            allowBlank:false,
            blankText:'不能为空！',
            queryMode: 'local',
            triggerAction: 'all',
            emptyText: '请选择商品信息',
            width: 150,
            listeners:{
              select: 'searchCommodityComboboxSelectChuang'
            }
        }, '-',{
          xtype:'textfield',
          hidden:true,
          // allowBlank:false,
          // blankText:'不能为空！',
          reference:'searchCommodityFieldValue',
          name:'purchaseStatisticsCommoditySearchField'
    }, '|',{
            xtype: 'combobox',
            reference:'searchWarehouseFieldName',
            hideLabel: true,
            store:Ext.create("Ext.data.Store", {//需更改连接后台获取所有仓库
          fields: ["name", "index"],
                 proxy: {
              //type: 'memory',
              type: 'ajax',
              method:'post',
              url: '/warehouse/findAll',  //mvc url  xxx.json //data文件夹要放到webapp下//ck连接后台需要改
            reader:{
              type:'json'
              // rootProperty:'warehouseLists'
            }
          },
          autoLoad: 'true'
      }),
            displayField: 'name',
            valueField:'index',
            //value:'2',
            editable: false,
            allowBlank:false,
            blankText:'不能为空！',
            queryMode: 'remote',
            triggerAction: 'all',
            emptyText: '请选择仓库',
            width: 135
        }, '|',{
        xtype: 'combobox',
            reference:'searchDateFieldName',
            hideLabel: true,
            store:Ext.create("Ext.data.Store", {
          fields: ["name", "value"],
          data: [
              { name: '今年', value: 'thisYear' },
              { name: '时间段', value: 'inputDate' }
          ]
          
      }),
            displayField: 'name',
            valueField:'value',
            //value:'interDate',
            editable: false,
            allowBlank:false,
            blankText:'不能为空！',
            queryMode: 'local',
            triggerAction: 'all',
            emptyText: '请选择时间',
            width: 135,
            listeners:{
              select: 'searchTimeComboboxSelectChuang'
            }
    }, '-',{
      xtype: 'datefield',
      emptyText: '起始日期',
      maxValue:new Date(),
      hideLabel: true,
      editable:false,
      hidden:true,
      format: 'Y/m/d',
            formatText:'',
      reference:'searchDataFieldValueFrom',
      fieldLabel: 'From',
      name: 'from_date',
      listeners:{
        select: 'searchDataFieldValueChuang'
      }
      //,id:'from_date',
      //vtype: 'daterange',
      //endDateField: 'to_date'
    }, {
      xtype: 'datefield',
      emptyText: '截止日期',
      maxValue:new Date(),
      hideLabel: true,
      editable:false,
      hidden:true,
      format: 'Y/m/d',
            formatText:'',
      reference:'searchDataFieldValueTo',
      fieldLabel: 'To',
      name: 'to_date',
      listeners:{
        select: 'searchDataFieldValueChuang'
      }
      //,id:'to_date',
      //vtype: 'daterange',
      //startDateField: 'from_date'
      },'-',{
          text: '查询',
          iconCls: 'fa fa-search',
          handler: 'quickSearch'
      },'->'],
  
    items: {
        xtype: 'cartesian',
        reference: 'chart',
        width: '100%',
        //height: 500,
        interactions: {
            type: 'panzoom',
            zoomOnPanGesture: true
        },
          
        animation: {
            duration: 200
        },
      /*store: {
            type: 'purchaseStatisticsStore'
        },*/
        bind: '{purchaseStatisticsLists}',
        innerPadding: {
            left: 40,
            right: 40
        },
        captions: {
            title: '采购统计表'
        },
        axes: [{
            type: 'numeric',
            position: 'left',
            //fields: ['value'],
            //grid: true,
            minimum: 0,
            maximum: 150,
            renderer: 'onAxisLabelRender',
            title: {
                text: '采购额（元）'
            }
        },{
            type: 'time',
            dateFormat: 'Y/m/d',
            visibleRange: [0, 1],
            //grid: true,
            position: 'bottom',
            //fields: ['time'],
            titleMargin: 12,
            title: {
                text: '日期（年/月/日）'
            },
            label: {
                rotate: {
                    degrees: -45
                }
            }
        }],
        series: [{
            type: 'line',
            xField: 'time',
            yField: 'purchaseAmount',
            style: {
                lineWidth: 2,
                fillStyle: '#115fa6',
                strokeStyle: '#115fa6',
                fillOpacity: 0.6,
                miterLimit: 3,
                lineCap: 'miter'
            },
            highlight: {
                fillStyle: '#000',
                radius: 5,
                lineWidth: 2,
                strokeStyle: '#fff'
            },
            tooltip: {
                trackMouse: true,
                showDelay: 0,
                dismissDelay: 0,
                hideDelay: 0,
                renderer: 'onSeriesTooltipRender'
            }
        }],
        listeners: {
            itemhighlight: 'onItemHighlight'
        }
    },
    
  bbar: {
        reference: 'toolbar',
        items: [
          //'->',
          {
            text: 'Preview',
            handler: 'onPreview'
        },
        {
                text: 'Reset pan/zoom',
                handler: 'onPanZoomReset'
            }
      ]
    },
    
    listeners: {
        afterrender: 'onAfterRender'
    }
    
});
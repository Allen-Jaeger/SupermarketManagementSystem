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
  tbar: [
    '->',
    {
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
              url: 'data/ck.json',  //mvc url  xxx.json //data文件夹要放到webapp下//ck连接后台需要改
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
      reference:'searchYearField',
      emptyText: '请输入/选择年份',
      // minValue:1000,
      maxValue:new Date(),
      // maxLength:4,
      regex:/^(1|2)(\d{3})$/,
      regexText:"请重新输入/选择(以1/2开头且不大于今年)年份！例：2018",
      hideLabel: true,
      //editable:false,
      allowBlank:false,
            blankText:'不能为空！',
      format: 'Y',
      formatText:'',//没有该项鼠标放上去会显示 expected date format Y
      name: 'year'
      //,id:'from_date',
      //vtype: 'daterange'
      
    },'-',{
          text: '查询',
          iconCls: 'fa fa-search',
          handler: 'search'/*function*/
      },'->'],

    items: [{
          xtype: 'cartesian',
          reference: 'bar3dchart',
          userCls: 'big-60 small-100',
          title: '月份销售统计',
          iconCls: 'x-fa fa-bar-chart',
          ui: 'light',
          width: 550,
          height: 500,
          tbar: [
            '->',
            {
            text: '查看大图',
                handler: 'onPreviewBar3dchart'
        },{
                text: '下载柱状图',
                handler: 'onDownloadBar3dchart'
            }
        ],
          // captions: {//标题
          //     title: {
          //         text: '月份销售统计',
          //         alignTo: 'chart'
          //     }
          // },
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
                  translationY: -170
              },
              renderer: 'onAxisLabelRender'
          }, {
              type: 'category3d',
              position: 'bottom',
              fields: 'month',
              title: {
                  text: '月份',
                  translationX: 130
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
                  renderer: 'onSeriesLabelRender'
              },
              highlight: true,
              style: {
                  color:'#00BFFF'
              }
          }
      },{
          xtype: 'polar',
          reference: 'piechart',
          userCls: 'big-40 small-100',
          width: 550,
          title: '季度销售统计',
        iconCls: 'x-fa fa-pie-chart',
      ui: 'light',
          downloadServerUrl: '//svg.sencha.io',
          innerPadding: 40,
         // width: '100%',
          height: 500,
          tbar: [
            '->',
            {
                text: '更换主题',
                handler: 'onThemeSwitch'
          },{
            text: '查看大图',
                handler: 'onPreviewPiechart'
        },{
                text: '下载饼图',
                handler: 'onDownloadPiechart'
            }
        ],
          bind:'{salesStatisticsLists}',//
          //theme: 'Muted',
          interactions: ['itemhighlight', 'rotate'],
          // legend: {
          //     type: 'sprite',
          //     docked: 'bottom'
          // },
          series: [{
                  type: 'pie',
                  angleField: 'quarterSales',
                  donut: 30,
                  distortion: 0.6,
                  highlight: {
                      margin: 40
                  },
                  label: {
                      field: 'quarter',
                      display: 'insideEnd'
                  },
                  tooltip: {
                      trackMouse: true,
                      renderer: 'onSeriesTooltipRender'
                  }
              }]
      }]
    
});
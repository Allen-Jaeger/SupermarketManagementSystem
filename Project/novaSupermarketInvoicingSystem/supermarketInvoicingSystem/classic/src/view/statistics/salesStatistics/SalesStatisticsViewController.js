
Ext.define('SupermarketInvoicingSystem.view.statistics.salesStatistics.SalesStatisticsViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.salesStatisticsViewController',
    /*theme*/
    requires: [
        'Ext.chart.theme.Midnight',
        'Ext.chart.theme.Green',
        'Ext.chart.theme.Muted',
        'Ext.chart.theme.Purple',
        'Ext.chart.theme.Sky'
    ],

    themeNames: [
        'Midnight',
        'Green',
        'Muted',
        'Purple',
        'Sky',
        'Default'
    ],
      

    /*Search*/    
 search:function(btn) {
        
        var searchShopFieldValue = this.lookupReference('searchShopField').getValue();
        
        var searchYearFieldValue = this.lookupReference('searchYearField').getValue();
        // var store = btn.up('salesStatisticsChartPanel').getStore();
        var cartesianStore = btn.up('salesStatisticsChartPanel').down('cartesian').getStore();//月份销售柱状图store
        var polarStore = btn.up('salesStatisticsChartPanel').down('polar').getStore();//季度销售饼图store
        var gridpanelStore = btn.up('salesStatisticsChartPanel').down('gridpanel').getStore();
        var currentYear =new Date();

        var regex=/^(1|2)(\d{3})$/;//正则表达式，校验输入的年份格式是否正确
            
        //var store = Ext.getCmp('userGridPanel').getStore();// Ext.getCmp(）需要在OrderPanel设置id属性
        if(searchShopFieldValue===null||searchYearFieldValue===null||searchYearFieldValue==""){
            Ext.Msg.alert("提示","请输入完整信息！");
            return;
        }
        if (typeof(searchYearFieldValue)==="object"&&(searchYearFieldValue.getFullYear()<1000||searchYearFieldValue.getFullYear()>currentYear.getFullYear())) {
            Ext.Msg.alert("提示","年份错误, 请重新输入/选择(以1/2开<br/>头且不大于今年)年份, 例:2018");
            return;
        }
        if (typeof(searchYearFieldValue)==="string"){
            var matchResult = searchYearFieldValue.match(regex);
            if(matchResult===null){// 匹配失败
                Ext.Msg.alert("提示","年份错误, 请重新输入/选择(以1/2开<br/>头且不大于今年)年份, 例:2018");
                return;
            }
        }


        Ext.apply(cartesianStore.proxy.extraParams, {shopId:"",starDate:"",endDate:"",charType:""});
        Ext.apply(polarStore.proxy.extraParams, {shopId:"",starDate:"",endDate:"",charType:""});
        Ext.apply(gridpanelStore.proxy.extraParams, {shopId:"",starDate:"",endDate:"",charType:""});
        
        var thisYearFirstDay=searchYearFieldValue.getFullYear() +"/01" + "/01";//该年一月一日
        var nextYearFirstDay=(searchYearFieldValue.getFullYear()+1) +"/01" + "/01";//下年一月一日
        
        Ext.apply(cartesianStore.proxy.extraParams, {shopId:searchShopFieldValue});
        Ext.apply(polarStore.proxy.extraParams, {shopId:searchShopFieldValue});
        Ext.apply(gridpanelStore.proxy.extraParams, {shopId:searchShopFieldValue});

        Ext.apply(cartesianStore.proxy.extraParams, {charType:"bar"});
        Ext.apply(polarStore.proxy.extraParams, {charType:"pie"});
        Ext.apply(gridpanelStore.proxy.extraParams, {charType:"gridpanel"});

        Ext.apply(cartesianStore.proxy.extraParams,{
          starDate:Ext.util.Format.date(thisYearFirstDay, 'Y/m/d H:i:s'),
          endDate:Ext.util.Format.date(nextYearFirstDay, 'Y/m/d H:i:s')
      });
        Ext.apply(polarStore.proxy.extraParams,{
            starDate:Ext.util.Format.date(thisYearFirstDay, 'Y/m/d H:i:s'),
            endDate:Ext.util.Format.date(nextYearFirstDay, 'Y/m/d H:i:s')
        });
        Ext.apply(gridpanelStore.proxy.extraParams,{
            starDate:Ext.util.Format.date(thisYearFirstDay, 'Y/m/d H:i:s'),
            endDate:Ext.util.Format.date(nextYearFirstDay, 'Y/m/d H:i:s')
        });
        
        
        cartesianStore.load();
        polarStore.load();
        gridpanelStore.load();
        //console.log(store);
    }, 



    /*Bar3d chart function*/
    onAxisLabelRender: function (axis, label, layoutContext) {
       
        var value = layoutContext.renderer(label/1000);
        return value === 0 ? '￥0' : Ext.util.Format.number(value, '￥0.00K');
    },

    onSeriesLabelRender: function (value) {
        return Ext.util.Format.number(value/1000, '￥0.00K');
    },

    onGridColumnRender: function (v) {
        return Ext.util.Format.number(v, '￥0,000K');
    },

    onPreviewBar3dchart: function () {
        if (Ext.isIE8) {
            Ext.Msg.alert('Unsupported Operation', 'This operation requires a newer version of Internet Explorer.');
            return;
        }
        var chart = this.lookup('bar3dchart');
        chart.preview();
    },

    onDownloadBar3dchart: function() {
        if (Ext.isIE8) {
            Ext.Msg.alert('Unsupported Operation', 'This operation requires a newer version of Internet Explorer.');
            return;
        }
        var chart = this.lookup('bar3dchart');
        chart.download({
            filename: 'monthSalesBar3dChart'
        });
    },

    onBar3dSeriesTooltipRender: function (tooltip, record, item) {
        tooltip.setHtml(record.get('month') + '月销售额(RMB): ' + record.get('monthSales')+'<br/>'+'月份总成本(RMB): '+record.get('mothTotalCosts')+'<br/>'+'月份利润(RMB): '+record.get('monthProfits'));
    },

    /*Line chart function*/
    onLineSeriesTooltipRender:function (value) {
        tooltip.setHtml(record.get('month') + '月份利润(RMB): ' + record.get('monthProfits'));
        
    },

    /*Pie chart function*/
   
  onThemeSwitch: function () { 
        var chart = this.lookup('piechart'),
          themeNames = this.themeNames,
          currentThemeName = Ext.getClassName(chart.getTheme()).split('.').pop(),
          currentIndex = Ext.Array.indexOf(themeNames, currentThemeName),
          nextThemeName = themeNames[++currentIndex % themeNames.length];

        chart.setTheme(nextThemeName);
        chart.redraw();
    },
    
    onPreviewPiechart: function () {
        if (Ext.isIE8) {
            Ext.Msg.alert('Unsupported Operation', 'This operation requires a newer version of Internet Explorer.');
            return;
        }
        var chart = this.lookup('piechart');
        chart.preview();
    },

    onDownloadPiechart: function() {
        if (Ext.isIE8) {
            Ext.Msg.alert('Unsupported Operation', 'This operation requires a newer version of Internet Explorer.');
            return;
        }
        var chart = this.lookup('piechart');
        chart.download({
            filename: 'quarterSalesPieChart'
        });
    },

    onPieSeriesTooltipRender: function (tooltip, record, item) {
        tooltip.setHtml(record.get('quarter') + '季度销售额(RMB): ' + record.get('quarterSales')+'<br/>'+'季度总成本(RMB): '+record.get('quarterTotalCosts')+'<br/>'+'季度利润(RMB): '+record.get('quarterProfits'));
    },


    // /*Grid rowwidget function*/
    
    onWidgetAttach:function (plugin, bodyComponent, record){
      var store = Ext.data.StoreManager.lookup('salesStatisticsOrderDetailStore');
      var orderid = record.get('orderId');
        //var store = bodyComponent.getStore();
      Ext.apply(store.proxy.extraParams, {orderId:""});
      Ext.apply(store.proxy.extraParams, {orderId:orderid});
     
      store.load();
    }
    
  
});

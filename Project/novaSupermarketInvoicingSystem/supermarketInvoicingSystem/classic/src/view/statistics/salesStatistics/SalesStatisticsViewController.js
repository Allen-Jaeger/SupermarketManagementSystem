
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
        
        var currentYear =new Date();

        var regex=/^(1|2)(\d{3})$/;//正则表达式，校验输入的年份格式是否正确
            
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

        //var store = Ext.getCmp('userGridPanel').getStore();// Ext.getCmp(）需要在OrderPanel设置id属性
        if(searchShopFieldValue===null||searchYearFieldValue===null){
            Ext.Msg.alert("提示","请输入完整信息！");
            return;
        }

        Ext.apply(cartesianStore.proxy.extraParams, {shopId:"",startDate:"",endDate:""});
        
      	var thisYearFirstDay=searchYearFieldValue.getFullYear() +"/01" + "/01";//该年一月一日
      	var nextYearFirstDay=(searchYearFieldValue.getFullYear()+1) +"/01" + "/01";//下年一月一日
        
        Ext.apply(cartesianStore.proxy.extraParams, {shopId:searchShopFieldValue});
        
        Ext.apply(cartesianStore.proxy.extraParams,{
	        startDate:Ext.util.Format.date(thisYearFirstDay, 'Y/m/d H:i:s'),
	        endDate:Ext.util.Format.date(nextYearFirstDay, 'Y/m/d H:i:s')
	    });
        
        
        cartesianStore.load();
        //console.log(store);
    }, 



    /*Bar3d chart function*/
    onAxisLabelRender: function (axis, label, layoutContext) {
        // Custom renderer overrides the native axis label renderer.
        // Since we don't want to do anything fancy with the value
        // ourselves except adding a thousands separator, but at the same time
        // don't want to loose the formatting done by the native renderer,
        // we let the native renderer process the value first.
        var value = layoutContext.renderer(label) / 1000;
        return value === 0 ? '￥0' : Ext.util.Format.number(value, '￥0K');
    },

    onSeriesLabelRender: function (value) {
        return Ext.util.Format.number(value / 1000, '￥0K');
    },

    onGridColumnRender: function (v) {
        return Ext.util.Format.number(v, '￥0,000');
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
        tooltip.setHtml(record.get('month') + '月销售额: ' + record.get('monthSales')+'<br/>'+'月份总成本: '+record.get('mothTotalCosts')+'<br/>'+'月份利润: '+record.get('monthProfits'));
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
        tooltip.setHtml(record.get('quarter') + '季度销售额: ' + record.get('quarterSales')+'<br/>'+'季度总成本: '+record.get('quarterTotalCosts')+'<br/>'+'季度利润: '+record.get('quarterProfits'));
    }
  
  
});
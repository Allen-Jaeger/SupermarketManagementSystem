
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
        
        var cartesianStore = btn.up('salesStatisticsChartPanel').down('cartesian').getStore();//月份销售柱状图store
        var polarStore = btn.up('salesStatisticsChartPanel').down('polar').getStore();//季度销售饼图store
        var currentYear = Ext.util.Format.date(new Date(), 'Y');
        var regex=/^(\d{4})$/;//正则表达式，校验输入的年份格式是否正确
        /*if (typeof(searchYearFieldValue)==="object") {
            if (Ext.util.Format.date(searchYearFieldValue, 'Y')<1000&&console.log("ssss");> {
                console.log("ssss");
            }
            
        }
        console.log(typeof(searchYearFieldValue));
        console.log(searchYearFieldValue);
        var reg = searchYearFieldValue.match(/^(\d{4})$/);*/
        /*if(reg==null){
            Ext.Msg.alert("警告!","年份格式错误, 请重新输入/选择(以1/2开头)年份! 例:2018");
            // alert("匹配失败");
        }else{
            alert("匹配成功");
        }*/

        
        // alert(store);
        // console.log(cartesianStore);
        // console.log(Ext.util.Format.date(searchYearFieldValue, 'Y'));
        //var store = Ext.getCmp('userGridPanel').getStore();// Ext.getCmp(）需要在OrderPanel设置id属性
        /*if(searchShopFieldValue===null||searchYearFieldValue===null){
            Ext.Msg.alert("提示","请输入完整信息！");
            return;
        }
        Ext.apply(store.proxy.extraParams, {shopId:"",year:""});

        Ext.apply(store.proxy.extraParams, {shopId:searchShopFieldValue});
        Ext.apply(store.proxy.extraParams,{
                year:Ext.util.Format.date(searchYearFieldValue, 'Y')
            });
        if(searchDateField==='inputDate'){//输入时间段
            if(searchDataFieldValueFrom===null||searchDataFieldValueTo===null){
                    Ext.Msg.alert("提示","请输入完整信息！");
                    return;
            }
            Ext.apply(store.proxy.extraParams,{
                createTimeStart:Ext.util.Format.date(searchDataFieldValueFrom, 'Y/m/d H:i:s'),
                createTimeEnd:Ext.util.Format.date(new Date(searchDataFieldValueTo.getTime()+24*60*60*1000), 'Y/m/d H:i:s')
            });
        }else{//时间段为本年
            var nowDate=new Date();//当前日期
            var thisYearFirstDay=nowDate.getFullYear() +"/01" + "/01";//本年一月一日
            Ext.apply(store.proxy.extraParams,{
                createTimeStart:Ext.util.Format.date(thisYearFirstDay, 'Y/m/d H:i:s'),
                createTimeEnd:Ext.util.Format.date(nowDate, 'Y/m/d H:i:s')
            });
        }
        
        store.load();*/
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

    onSeriesTooltipRender: function (tooltip, record, item) {
        tooltip.setHtml(record.get('quarter') + '销售额: ' + record.get('quarterSales'));
    },
  
  
});
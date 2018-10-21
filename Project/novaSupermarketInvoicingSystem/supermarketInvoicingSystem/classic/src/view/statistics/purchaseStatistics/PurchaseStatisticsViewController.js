
Ext.define('SupermarketInvoicingSystem.view.statistics.purchaseStatistics.PurchaseStatisticsViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.purchaseStatisticsViewController',
  
  searchDataFieldValueChuang:function(){
      var datefrom = this.lookupReference('searchDataFieldValueFrom').getValue();
      var dateto =  this.lookupReference('searchDataFieldValueTo').getValue();
    if((dateto-datefrom)<0 && dateto !==null){
        Ext.Msg.alert("提示","输入错误！截止日期要大于起始日期！");
        this.lookupReference('searchDataFieldValueTo').reset();
    }
    this.lookupReference('searchDataFieldValueTo').setMinValue(this.lookupReference('searchDataFieldValueFrom').getValue());
  },

searchCommodityComboboxSelectChuang:function(combo,record,index){
    //alert(record.data.name);
    var searchField = this.lookupReference('searchCommodityFieldName').getValue();
    if(searchField==='all'){
      this.lookupReference('searchCommodityFieldValue').hide();
    }else{
      this.lookupReference('searchCommodityFieldValue').show();
    }
  },

  searchTimeComboboxSelectChuang:function(combo,record,index){
    //alert(record.data.name);
    var searchField = this.lookupReference('searchDateFieldName').getValue();
    if(searchField==='inputDate'){
      this.lookupReference('searchDataFieldValueFrom').show();
      this.lookupReference('searchDataFieldValueTo').show();
    }else{
      this.lookupReference('searchDataFieldValueFrom').hide();
      this.lookupReference('searchDataFieldValueTo').hide();
    }
  },

  /*Quick Search*/  
  quickSearch:function(btn) {
    var searchCommodityField = this.lookupReference('searchCommodityFieldName').getValue();
    var searchCommodityFieldValue = this.lookupReference('searchCommodityFieldValue').getValue();
    
    var searchWarehouseFieldValue = this.lookupReference('searchWarehouseFieldName').getValue();
    
    var searchDateField = this.lookupReference('searchDateFieldName').getValue();
    var searchDataFieldValueFrom = this.lookupReference('searchDataFieldValueFrom').getValue();
    var searchDataFieldValueTo = this.lookupReference('searchDataFieldValueTo').getValue();
    
    var store = btn.up('purchaseStatisticsChartPanel').down('cartesian').getStore();
    //alert(store);
    //console.log(store);
    //var store = Ext.getCmp('userGridPanel').getStore();// Ext.getCmp(）需要在OrderPanel设置id属性
    if(searchCommodityField===null||searchWarehouseFieldValue===null||searchDateField===null){
      Ext.Msg.alert("提示","请输入完整信息！");
      return;
    }
    Ext.apply(store.proxy.extraParams, {barCode:"",commodityName:"",warehouseId:"",createTimeStart:"",createTimeEnd:""});

    Ext.apply(store.proxy.extraParams, {warehouseId:searchWarehouseFieldValue});
    if(searchCommodityField!=='all'){
      if(searchCommodityFieldValue===""){
        Ext.Msg.alert("提示","请输入完整信息！");
        return;
      }
    
      if(searchCommodityField==='barCode'){
        Ext.apply(store.proxy.extraParams, {barCode:searchCommodityFieldValue});
      }else{
        Ext.apply(store.proxy.extraParams, {commodityName:searchCommodityFieldValue});
      }
    }
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
    
    store.load();
    //console.log(store);
  }, 
  
  
  onAxisLabelRender: function (axis, label, layoutContext) {
        // Custom renderer overrides the native axis label renderer.
        // Since we don't want to do anything fancy with the value
        // ourselves except appending a '%' sign, but at the same time
        // don't want to loose the formatting done by the native renderer,
        // we let the native renderer process the value first.
        return layoutContext.renderer(label);
    },

    onSeriesTooltipRender: function (tooltip, record, item) {
      var time = Ext.util.Format.date(record.get('time'),'Y/m/d');
        tooltip.setHtml(time + '采购额: ' + record.get('purchaseAmount'));
    },

    onItemHighlight: function (chart, newHighlightItem, oldHighlightItem) {
        this.setSeriesLineWidth(newHighlightItem, 4);
        this.setSeriesLineWidth(oldHighlightItem, 2);
    },

    setSeriesLineWidth: function (item, lineWidth) {
        if (item) {
            item.series.setStyle({
                lineWidth: lineWidth
            });
        }
    },

    onPreview: function () {
        if (Ext.isIE8) {
            Ext.Msg.alert('Unsupported Operation', 'This operation requires a newer version of Internet Explorer.');
            return;
        }
        var chart = this.lookup('chart');
        chart.preview();
    },
    
    onPanZoomReset: function () {
        var chart = this.lookup('chart'),
            axes = chart.getAxes();

        axes[0].setVisibleRange([0, 1]);//y
        axes[1].setVisibleRange([0, 1]);//x
        chart.redraw();
    },
    
    onAfterRender: function () {
      var chart = this.lookup('chart'),
          toolbar = this.lookup('toolbar'),
          panzoom = chart.getInteractions()[0];
      toolbar.add(panzoom.getModeToggleButton());
    }
  
  
});

Ext.define('SupermarketInvoicingSystem.view.process.indent.IndentProcessViewController', 
  {extend:Ext.app.ViewController, 
    alias:'controller.indentProcessViewController',
  autoAdapting:function(node) {
  var theWindow = node.id;
  var flexWidth = Ext.getCmp(theWindow).width - 160;
  Ext.getCmp('leftList').setWidth(flexWidth * 0.4);
  Ext.getCmp('middleButton').setWidth(flexWidth * 0.1);
  Ext.getCmp('rightList').setWidth(flexWidth * 0.5);
}, openIndentProcessLookupWindow:function(grid, rowIndex, colIndex) {
  var record = grid.getStore().getAt(rowIndex);
  var store = Ext.data.StoreManager.lookup('leftStore');
  Ext.apply(store.proxy.extraParams, {indentId:record.id});
  store.load({params:{start:0, limit:20, page:1}});
  var win = grid.up('container').up('container').add(Ext.widget('indentProcessLookupWindow'));
  win.show();
  record.data.toWarehouseName = record.data.toWarehouse.name;
  record.data.creatorName = record.data.creator.name;
  win.down('form').getForm().loadRecord(record);
},signIndent:function(view, recIndex, cellIndex, item, e, record){
  
  if (record.data.taskClaimTime == null) {
    if(document.getElementById('claimButton').innerHTML != '无效')
    { 
      Ext.Ajax.request({url:'indent/claim/' + record.get('taskId'), params:{indentId:record.get('id')}, method:'POST', success:function(response, options) {
      var res = response.responseText;
      Ext.data.StoreManager.lookup('indentProcessStore').load();
     }});
    }
  } else{//审批
      
      if((record.data.taskName == '订单审批' && document.getElementById('checkingButton').innerHTML != "无效")||record.data.taskName =='负责人审批'){
      var store = Ext.data.StoreManager.lookup('leftStore');
      Ext.apply(store.proxy.extraParams, {indentId:record.get('id')});
      store.load({params:{start:0, limit:20, page:1}});
      var win = view.up('container').up('container').add(Ext.widget('indentProcessLookupWindow'));
      win.show();
      if(null!=record.data.toWarehouse)
        record.data.toPlaceName = record.data.toWarehouse.name;
      else
        record.data.toPlaceName = record.data.toShop.name;
      record.data.creatorName = record.data.creator.name;
      win.down('form').getForm().loadRecord(record);
    }else if(record.data.taskName == '通知取货'||record.data.taskName == '申请退回'){
      var url = 'indent/complete/' + record.data.taskId;
      var variables = [];
    this.complete(url,variables);
    }else if(record.data.taskName == '仓库管理员审查' || record.data.taskName == '确认收货'){
      var win = view.up('container').up('container').add(Ext.widget('indentProcessGoodsCheck'));
      win.show();
      if(null!=record.data.toWarehouse)
        record.data.toPlaceName = record.data.toWarehouse.name;
      else
        record.data.toPlaceName = record.data.toShop.name;
      record.data.creatorName = record.data.creator.name;
      win.down('form').getForm().loadRecord(record);
    }
  }
},submitGoodsCheckWindow:function(btn){
    var form = btn.up('container').up('container').down('form');
    var taskId = form.getForm().findField('taskId').value;
    var check = form.getForm().findField('check').getGroupValue();
    var reason = form.getForm().findField('reason').value;
    var url = 'indent/complete/' + taskId;
      var variables = [{
      key: 'examinationPass',
      value: check,//获取表单选择的value
      type: 'B'
    },{
      key: 'goodsCheckingReason',
      value: reason,//获取表单选择的value
      type: 'S'
    }];
    this.complete(url,variables,form);
},submitIndentProcessWindow:function(btn){
    var form = btn.up('container').up('container').down('form');
    var taskId = form.getForm().findField('taskId').value;
    var check = form.getForm().findField('check').getGroupValue();
    var reason = form.getForm().findField('reason').value;
    var url = 'indent/complete/' + taskId;
      var variables = [{
      key: 'pass',
      value: check,//获取表单选择的value
      type: 'B'
    },{
      key: 'indentCheckingReason',
      value: reason,//获取表单选择的value
      type: 'S'
    }];
    this.complete(url,variables,form);
},complete: function(url, variables,form){
    // 转换JSON为字符串
      var keys = "", values = "", types = "";
    if (variables) {
      Ext.each(variables, function (item) {
        if (keys != "") {
          keys += ",";
          values += ",";
          types += ",";
        }
        keys += item.key;
        values += item.value;
        types += item.type;
            });
    }
    Ext.Ajax.request({
            url: url,
            method: 'post',
            params : { 
        keys: keys,
            values: values,
            types: types
      }, 
            success: function(response, options) {
                var json = Ext.util.JSON.decode(response.responseText);
                if (json.success) {
                    Ext.Msg.alert('操作成功', json.msg, function() {
                      form.up('window').close();
                        //grid.getStore().reload();
                        Ext.data.StoreManager.lookup('indentProcessStore').load();
                    });
                } else {
                    Ext.Msg.alert('操作失败', json.msg);
                }
            }
        });
  }
  ,reSubmitIndentProcess:function(grid, rowIndex, colIndex) {
    var taskId = grid.getStore().getAt(rowIndex).get('taskId');
    var url = 'indent/complete/' + taskId;
      var variables = [{
      key: 'modify',
      value: true,//获取表单选择的value
      type: 'B'
    }];
    this.complete(url,variables);
},cancelIndentProcess:function(grid, rowIndex, colIndex) {
  var indentStatus = grid.getStore().getAt(rowIndex).get('indentStatus');
  var indetnId2 = grid.getStore().getAt(rowIndex).get('id');
  if(indentStatus == 'CHECKING' || indentStatus == 'DISAPPROVED')
  var processInstanceId = grid.getStore().getAt(rowIndex).get('processInstanceId');
  Ext.Ajax.request({
      url: 'indent/delete/' + processInstanceId,
      method: 'post',
      params:{indentId:indetnId2},
      success: function (response, options) {
        var json = Ext.util.JSON.decode(response.responseText);
        if (json.success) {
          Ext.Msg.alert('操作成功', json.msg, function() {
        Ext.data.StoreManager.lookup('indentProcessStore').load();
      });
        } else {
          Ext.Msg.alert('操作失败', json.msg);
        }
      }
    });
}
});
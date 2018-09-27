Ext.define('SupermarketInvoicingSystem.view.indent.IndentViewController', {extend:Ext.app.ViewController, alias:'controller.indentViewController', addCommoditiesIntoIndent:function(btn) {
  var selectedCommodityName = Ext.getCmp('selectedCommodityName').getValue();
  if (selectedCommodityName != null) {
    var fd = new Ext.form.DisplayField({value:selectedCommodityName, height:20});
    Ext.getCmp('commoditiesList').add(fd);
  }
}, addIntoselectcommoditiesList:function() {
  var rightgridrecord = Ext.getCmp('rightList').getSelectionModel().getSelection();
  var leftgrid = Ext.getCmp('leftList');
  var rightgrid = Ext.getCmp('rightList');
  for (var i = 0; i < rightgridrecord.length; i++) {
    var rowLength = leftgrid.getStore().data.length + 1;
    leftgrid.store.insert(rowLength, rightgridrecord);
	rightgridrecord[i].setSelectable = false;
    //rightgrid.store.remove(rightgridrecord);
	//rightgridrecord.style.backgroundColor = '#CCCCCC';
	
	
  }
  /* Ext.each(rows, function (row) {
						row.style.backgroundColor = '#CCCCCC';
					}); */
  //rows.style.backgroundColor = '#CCCCCC';
 /*  var j=0;
  var length = rightgrid.getStore().getCount();
	while(j<length){
		if(rightgrid.getSelectionModel().getRow(j))
			rightgrid.getView().getRow(j).style.backgroundColor = '#CCCCCC';
		j++;
	}
  alert("2"); */
  
  
}, cancelselectcommoditiesList:function(grid, rowIndex, colIndex) {
  var leftgridrecord = Ext.getCmp('leftList').getSelection();
  var rightgrid = Ext.getCmp('rightList');
  var leftgrid = Ext.getCmp('leftList');
  for (var i = 0; i < leftgridrecord.length; i++) {
    var rowLength = rightgrid.getStore().data.length + 1;
    //rightgrid.store.insert(rowLength, leftgridrecord);
    leftgrid.store.remove(leftgridrecord);
  }
}, displayorhideright:function() {
  if (!Ext.getCmp('rightList').hidden) {
    Ext.getCmp('middleButton').hide();
    Ext.getCmp('rightList').hide();
    Ext.getCmp('leftList').setWidth(650);
  } else {
    Ext.getCmp('middleButton').show();
    Ext.getCmp('rightList').show();
    Ext.getCmp('leftList').setWidth(200);
  }
}, editBlock:function(grid, rowIndex, colIndex) {
  alert('1');
}, 

		openAddWindow:function(toolbar, rowIndex, colIndex) {
			 alert('123');
		     Ext.Ajax.request({url:'indent/userName', method:'post', success:function(response, options) {
			  var json = Ext.util.JSON.decode(response.responseText);
			    if (json.success) {
					  Ext.getCmp('creatorId').setValue(json.map.userName);
					} else {
					  Ext.getCmp('creatorId').setValue('');
					}
		  }});
		  toolbar.up('panel').up('container').add(Ext.widget('indentAddWindow')).show();
}, fillWithUserName:function(btn) {
}, 
		openEditWindow:function(grid, rowIndex, colIndex) {
		  var record = grid.getStore().getAt(rowIndex);
		  if (record) {
			if (record.data.indentStatus == 'INIT') {
			  var win = grid.up('container').add(Ext.widget('indentEditWindow'));
			  win.show();
			  win.down('form').getForm().loadRecord(record);
			} else {
			  Ext.Msg.alert('提示', "只可以修改'新建'状态的信息！");
			}
		  }
		}


, openSearchWindow:function(toolbar, rowIndex, colIndex) {
  toolbar.up('panel').up('container').add(Ext.widget('indentSearchWindow')).show();
}, 
searchComboboxSelectChuang:function(combo, record, index) {
	var selectedCat = Ext.getCmp('commodityType').getValue();
	var store = Ext.getCmp('rightList').getStore();
	Ext.apply(store.proxy.extraParams,{commodityType:selectedCat});
	store.load({params:{start:0, limit:20, page:1}});
}, 

		submitAddForm:function(btn) {
		  var win = btn.up('window');
		  var form = win.down('form');
		  var record = Ext.create('SupermarketInvoicingSystem.model.indent.IndentModel');
		  var values = form.getValues();
		  record.set(values);
		  record.save();
		  Ext.data.StoreManager.lookup('indentStore').load();
		  win.close();
		}
, submitEditForm:function(btn) {
  var win = btn.up('window');
  var store = Ext.data.StoreManager.lookup('indentStore');
  var values = win.down('form').getValues();
  var record = store.getById(values.id);
  record.set(values);
  win.close();
}, 

quickSearch:function(btn) {
  var searchField = this.lookupReference('searchFieldName').getValue();
  var searchDataFieldValue = this.lookupReference('searchDataFieldValue').getValue();
  var searchDataFieldValue2 = this.lookupReference('searchDataFieldValue2').getValue();
  var store = btn.up('gridpanel').getStore();
  Ext.apply(store.proxy.extraParams, {startTime:'', endTime:''});
  if (searchField === 'indentTime') {
    Ext.apply(store.proxy.extraParams, {
		startTime:Ext.util.Format.date(searchDataFieldValue, 'Y/m/d H:i:s'),
		endTime:Ext.util.Format.date(searchDataFieldValue2, 'Y/m/d H:i:s')});
  }
  store.load({params:{start:0, limit:20, page:1}});
}, 
submitSearchForm:function(btn) {
  var store = Ext.data.StoreManager.lookup('indentStore');
  var win = btn.up('window');
  var form = win.down('form');
  var values = form.getValues();
  Ext.apply(store.proxy.extraParams, {startTime:'', endTime:''});
  Ext.apply(store.proxy.extraParams, {startTime:Ext.util.Format.date(values.startTime, 'Y/m/d H:i:s'), endTime:Ext.util.Format.date(values.endTime, 'Y/m/d H:i:s')});
  store.load({params:{start:0, limit:20, page:1}});
  win.close();
}, 



			deleteOneRow:function(grid, rowIndex, colIndex) {
			  var store = grid.getStore();
			  var record = store.getAt(rowIndex);
			  if (record.data.indentStatus == 'INIT') 
			  {
		
				Ext.MessageBox.confirm('提示', '确定要进行删除操作吗？数据将无法还原！', function(btn, text) {
				  if (btn == 'yes') {
					store.remove(record);
					
				  }
				}, this);
			  } else {
				Ext.Msg.alert('提示', "只可以删除'初始化'状态的信息！");
			  }
			}, 



deleteMoreRows:function(btn, rowIndex, colIndex) {
	
  var grid = btn.up('gridpanel');
  var selModel = grid.getSelectionModel();
  if (selModel.hasSelection()) {
    Ext.Msg.confirm('警告', '确定要删除吗？', function(button) {
      if (button == 'yes') {
        var rows = selModel.getSelection();
        var selectIds = [];
        Ext.each(rows, function(row) {
          if (row.data.processStatus == 'NEW') {
            selectIds.push(row.data.id);
          }
        });
        Ext.Ajax.request({url:'/indent/deletes', method:'post', params:{ids:selectIds}, success:function(response, options) {
          var json = Ext.util.JSON.decode(response.responseText);
          if (json.success) {
            Ext.Msg.alert('操作成功', json.msg, function() {
              grid.getStore().reload();
            });
          } else {
            Ext.Msg.alert('操作失败', json.msg);
          }
        }});
      }
    });
  } else {
    Ext.Msg.alert('错误', '没有任何行被选中，无法进行删除操作！');
  }
}, 
	//流程开始模块
	starIndentProcess:function(grid, rowIndex, colIndex) {
	  var record = grid.getStore().getAt(rowIndex);
	  Ext.Ajax.request({url:'/indent/start', method:'post', params:{id:record.get('id')}, success:function(response, options) {
		var json = Ext.util.JSON.decode(response.responseText);
		if (json.success) {
		  Ext.Msg.alert('操作成功', json.msg, function() {
			grid.getStore().reload();
		  });
		} else {
		  Ext.Msg.alert('操作失败', json.msg);
		}
	  }});
	}


, cancelIndentProcess:function(grid, rowIndex, colIndex) {
  Ext.Msg.alert('Title', 'Cancel Indent Process');
}});
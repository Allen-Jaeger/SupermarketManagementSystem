Ext.define('SupermarketInvoicingSystem.view.indent.IndentViewController', {
  extend: Ext.app.ViewController,
  alias: 'controller.indentViewController',
  addCommoditiesIntoIndent: function (btn) {
    var selectedCommodityName = Ext.getCmp('selectedCommodityName').getValue();
    if (selectedCommodityName != null) {
      var fd = new Ext.form.DisplayField({
        value: selectedCommodityName,
        height: 20
      });
      Ext.getCmp('commoditiesList').add(fd);
    }
  },
  addSelectedIntoselectcommoditiesList: function () {
    var rightgridrecord = Ext.getCmp('rightList').getSelectionModel().getSelection();
    var leftgrid = Ext.getCmp('leftList');
    var rightgrid = Ext.getCmp('rightList');
    var rightgridLength = rightgrid.getStore().getCount();
    for (var i = 0; i < rightgridrecord.length; i++) {
      var rowLength = leftgrid.getStore().data.length + 1;
      var addingRowCommoditiesName = rightgridrecord[i].data.name;
      rightgridrecord[i].data.price = 0;
      rightgridrecord[i].data.amount = '';
      var flag = 0;
      leftgrid.store.each(function (record) {
        if (record.get('name') == addingRowCommoditiesName) {
          flag = 1;
        }
      });
      if (flag == 0) {
        leftgrid.store.insert(rowLength, rightgridrecord[i].data);
      }
    }
  },
  addOneIntoselectcommoditiesList: function (grid, rowIndex) {
    var rightgridrecord = grid.getStore().getAt(rowIndex);
    var leftgrid = Ext.getCmp('leftList');
    var rowLength = leftgrid.getStore().data.length + 1;
    var addingRowCommoditiesName = rightgridrecord.data.name;
    rightgridrecord.data.price = 0;
    rightgridrecord.data.amount = '';
    var flag = 0;
    leftgrid.store.each(function (record) {
      if (record.get('name') == addingRowCommoditiesName) {
        flag = 1;
      }
    });
    if (flag == 0) {
      leftgrid.store.insert(rowLength, rightgridrecord.data);
    } else {
      Ext.Msg.show(Ext.String.format('You clicked the  button'));
    }
  },
  updateSingleCost: function (val) {
    var grid = Ext.getCmp('leftList');
    var record = grid.getSelectionModel().getSelection();
    var num = record[0].get('num');
    var cost = record[0].data.cost;
    record[0].set('price', val.value * cost);
    var gridLength = grid.getStore().getCount();
    var sum = 0;
    var money = 0;
    for (var i = 0; i < gridLength; i++) {
      sum += grid.getStore().getAt(i).get('price');
    }
    Ext.getCmp('cost').setValue(sum);
  },
  cancelselectcommoditiesList: function (grid, rowIndex, colIndex) {
    var leftgridrecord = Ext.getCmp('leftList').getSelection();
    var rightgrid = Ext.getCmp('rightList');
    var leftgrid = Ext.getCmp('leftList');
    for (var i = 0; i < leftgridrecord.length; i++) {
      var rowLength = rightgrid.getStore().data.length + 1;
      leftgrid.store.remove(leftgridrecord);
    }
  },
  deleteOneSelectedIndent: function (grid, rowIndex) {
    var leftgridDeleteRow = grid.getStore().getAt(rowIndex);
    grid.store.remove(leftgridDeleteRow);
  },
  displayorhideright: function () {
    var theWindow = Ext.getCmp('indentAddWindow');
    if (!Ext.getCmp('rightList').hidden) {
      Ext.getCmp('middleButton').hide();
      Ext.getCmp('rightList').hide();
      if (!theWindow.maximized) {
        Ext.getCmp('leftList').setWidth(820 * 0.8);
      } else {
        Ext.getCmp('leftList').setWidth(theWindow.width * 0.87);
      }
    } else {
      if (!theWindow.maximized) {
        Ext.getCmp('leftList').setWidth(820 * 0.25);
        Ext.getCmp('rightList').setWidth(820 * 0.5);
      } else {
        Ext.getCmp('leftList').setWidth(theWindow.width * 0.34);
        Ext.getCmp('rightList').setWidth(theWindow.width * 0.5);
      }
      Ext.getCmp('middleButton').show();
      Ext.getCmp('rightList').show();
    }
  },
  editBlock: function (grid, rowIndex, colIndex) {
    alert('1');
  },
  openAddPurchaseWindow: function (toolbar, rowIndex, colIndex) {
    Ext.Ajax.request({
      url: 'indent/fillUser',
      method: 'post',
      success: function (response, options) {

        var json = Ext.util.JSON.decode(response.responseText);
        if (json.success) {
          Ext.getCmp('creatorId').setValue(json.map.userName);
        } else {
          Ext.getCmp('creatorId').setValue('');
        }
      }
    });
    toolbar.up('panel').up('container').add(Ext.widget('indentAddWindow')).show();
  },
  openAddTransferWindow: function (toolbar, rowIndex, colIndex) {
    var me = this;
    Ext.Ajax.request({
      url: 'indent/fillUser',
      method: 'post',
      success: function (response, options) {
        var json = Ext.util.JSON.decode(response.responseText);
        if (json.success) {
          Ext.getCmp('creatorId').setValue(json.map.userName);
          Ext.getCmp('toPlace').setValue(json.map.userPlace);
          Ext.getCmp('toPlaceId').setValue(json.map.placeId);
          Ext.getCmp('toPlaceType').setValue(json.map.placeType);
          if (Ext.getCmp('toPlaceType').getValue() == 'WARE') {
            Ext.getCmp('retreatCheck').setDisabled(true);
          }
        } else {
          Ext.getCmp('creatorId').setValue('');
          Ext.getCmp('toPlace').setValue('');
          Ext.getCmp('toPlaceId').setValue('');
          Ext.getCmp('toPlaceType').setValue('');
        }
        me.searchLeftCommodities();
      }
    });
    toolbar.up('panel').up('container').add(Ext.widget('transferAddWindow')).show();
  },
  displaySelectedPlaceList: function (val) {
    if (val.value == 'WARE') {
      Ext.getCmp('toWarehouseId').show();
      Ext.getCmp('toShopId').hide();
    } else {
      Ext.getCmp('toWarehouseId').hide();
      Ext.getCmp('toShopId').show();
    }
  },
  displayShopOrWareCommoditiesInfo: function (val) {
    if (val.value != '请选择') {
      if (Ext.getCmp('placeType').value == 'WARE') {
        Ext.Ajax.request({
          url: 'warehouse/findCommodityById',
          method: 'post',
          params: {
            warehouseId: val.value
          },
          success: function (response, options) {
            var maps = Ext.util.JSON.decode(response.responseText);
            for (var i = 0; i < maps.length; i++) {
              if (maps[i].amount < 50) {
                for (var j = 0; j < Ext.getCmp("rightList").getStore().getCount(); j++) {
                  if (Ext.getCmp("rightList").getStore().getAt(j).get('name') == maps[i].name) {
                    Ext.getCmp("rightList").getStore().getAt(j).set("lack", "缺货");
                  }
                }
              }
            }
          }
        });
      } else {

      }
    }


  },
  adaptMax: function (btn) {
    var theWindow = Ext.getCmp(btn.id);
    if (theWindow.maximized) {
      if (Ext.getCmp('rightList').hidden) {
        Ext.getCmp('leftList').setWidth(theWindow.width * 0.8);
      } else {
        Ext.getCmp('leftList').setWidth(theWindow.width * 0.25);
        Ext.getCmp('rightList').setWidth(theWindow.width * 0.5);
      }
    } else {
      if (theWindow.width != 820) {
        if (Ext.getCmp('rightList').hidden) {
          Ext.getCmp('leftList').setWidth(theWindow.width * 0.87);
        } else {
          Ext.getCmp('leftList').setWidth(theWindow.width * 0.34);
          Ext.getCmp('rightList').setWidth(theWindow.width * 0.5);
        }
      }
    }
  },
  openEditWindow: function (grid, rowIndex, colIndex) {
    Ext.Ajax.request({
      url: 'indent/fillUser',
      method: 'post',
      success: function (response, options) {
        var json = Ext.util.JSON.decode(response.responseText);
        if (json.success) {
          Ext.getCmp('creatorId').setValue(json.map.userName);
        } else {
          Ext.getCmp('creatorId').setValue('');
        }
      }
    });
    var record = grid.getStore().getAt(rowIndex);
    var store = Ext.data.StoreManager.lookup('leftStore');
    Ext.apply(store.proxy.extraParams, {
      indentId: record.id
    });
    store.load({
      params: {
        start: 0,
        limit: 20,
        page: 1
      }
    });
    if (record) {
      if (record.data.indentStatus == 'INIT') {
        var win = grid.up('container').up('container').add(Ext.widget('indentEditWindow'));
        win.show();
        record.data.toshopid = record.data.toShop.id;
        win.down('form').getForm().loadRecord(record);
      } else {
        Ext.Msg.alert('提示', "只可以修改'初始化'状态的信息！");
      }
    }
  },
  openSearchWindow: function (toolbar, rowIndex, colIndex) {
    toolbar.up('panel').up('container').add(Ext.widget('indentSearchWindow')).show();
  },
  searchByCommodityType: function () {
    var selectedCat = Ext.getCmp('commodityType').getValue();
    var store = Ext.getCmp('rightList').getStore();
    Ext.apply(store.proxy.extraParams, {
      commodityType: selectedCat
    });
    store.load({
      params: {
        start: 0,
        limit: 20,
        page: 1
      }
    });
  },
  searchRightCommodities: function () {
    var selectedType = Ext.getCmp('commodityType').getValue();
    var selectedWare = Ext.getCmp('fromPlace').getValue();
    var keyWord = Ext.getCmp('keyWord').getValue();
    var searchType = 'Right';
    var placeType = 'WARE';
    var store = Ext.getCmp('rightList').getStore();
    Ext.apply(store.proxy.extraParams, {
      commodityType: selectedType,
      placeId: selectedWare,
      name: keyWord,
      searchType: searchType,
      placeType: placeType
    });
    store.load({
      params: {
        start: 0,
        limit: 20,
        page: 1
      }
    });
  },
  searchLeftCommodities: function (combo, record, index) {
    var toPlaceId = Ext.getCmp('toPlaceId').getValue();
    var placeType = Ext.getCmp('toPlaceType').getValue();
    var searchType = 'Left';
    var store = Ext.getCmp('leftList').getStore();
    Ext.apply(store.proxy.extraParams, {
      placeId: toPlaceId,
      searchType: searchType,
      placeType: placeType
    });
    store.load({
      params: {
        start: 0,
        limit: 20,
        page: 1
      }
    });
  },
  refreshBtn: function (combo, record, index) {
    Ext.getCmp('commodityType').setValue('');
    Ext.getCmp('keyWord').setValue('');
    this.searchRightCommodities();
    this.searchLeftCommodities();
    Ext.getCmp('submitBtn').setDisabled(true);
  },
  getWareList: function (combo) {
    var se = Ext.data.StoreManager.lookup('wareStore');
    var me = this;
    se.load();
    se.on('load', function () {
      if (Ext.getCmp('toPlaceType').getValue() == 'WARE') {
        var same = Ext.getCmp('toPlaceId').getValue() - 1;
        se.remove(se.getAt(same));
        combo.setValue(se.getAt(0).get('index'));
      } else {
        combo.setValue(se.getAt(0).get('index'));
      }
    });
    var task = new Ext.util.DelayedTask(function () {
      me.searchRightCommodities();
    });
    task.delay(400);
  },
  commoditiesListRightToLeft: function () {
    var rightGridRecord = Ext.getCmp('rightList').getSelectionModel().getSelection();
    var leftGrid = Ext.getCmp('leftList');
    for (var i = 0; i < rightGridRecord.length; i++) {
      var rowLength = leftGrid.getStore().data.length + 1;
      var addingRowCommoditiesid = rightGridRecord[i].data.id;
      // var addingRowCommoditiesName = rightGridRecord[i].data.name;
      // var addingRowCommoditiesEXP = rightGridRecord[i].data.period;
      //rightGridRecord[i].data.price = 0;
      //rightGridRecord[i].data.amount = 0;
      //在编辑时，先判断要插入的数据是否已经存在,flag=0表示不存在，flag=1表示已存在
      var flag = 0;
      leftGrid.store.each(function (record) {
        // if(record.get("period") == addingRowCommoditiesEXP&&record.get("name") == addingRowCommoditiesName) {
        //     flag = 1;
        //  }
        if (record.get("id") == addingRowCommoditiesid) {
          flag = 1;
          //alert(addingRowCommoditiesid);
        }
      });
      if (flag == 0) {
        leftGrid.store.insert(rowLength, rightGridRecord[i].data);
        leftGrid.store.getAt(leftGrid.store.getCount() - 1).set('amount', 0);
      }
    }
  },
  commoditiesListLeftToRight: function (grid, rowIndex, colIndex) { //用上面右到左的功能修改而成.
    var LeftGridRecord = Ext.getCmp('leftList').getSelectionModel().getSelection();
    var rightGrid = Ext.getCmp('rightList');
    for (var i = 0; i < LeftGridRecord.length; i++) {

      var rowLength = rightGrid.getStore().data.length + 1;
      var addingRowCommoditiesid = LeftGridRecord[i].data.id;
      var flag = 0;

      rightGrid.store.each(function (record) {
        if (record.get("id") == addingRowCommoditiesid) {
          flag = 1;
        }
      });

      if (flag == 0) {
        rightGrid.store.insert(rowLength, LeftGridRecord[i].data);
        rightGrid.store.getAt(rightGrid.store.getCount() - 1).set('amount', 0);
      }
    }
  },
  listenCheckChange: function (check, newValue, oldValue, eOpts) {
    var me = this;
    if (newValue == true) {
      Ext.getCmp('leftBtn').setDisabled(true);
      Ext.getCmp('rightBtn').setDisabled(false);
      me.refreshBtn();
    } else {
      Ext.getCmp('leftBtn').setDisabled(false);
      Ext.getCmp('rightBtn').setDisabled(true);
      me.refreshBtn();
    }
  },
  calculateTransferCost: function (btn) {
    //以后要设置判断RetreatCheck是否为true,来确定调货单是否是残缺品处理单.
    var leftGrid = Ext.data.StoreManager.lookup('transferLeftStore');
    var leftGridData = leftGrid.getRange();
    var leftGridLength = leftGrid.getCount();
    var leftGridOriginsLength;
    var leftGridDataJson = [];

    leftGrid.load({
      scope: this,
      callback: function (records, operation, success) {
        leftGridOriginsLength = leftGrid.getCount();
        var i = leftGridOriginsLength;
        var j = leftGridLength;
        for (i, j; i < j; i++) {
          leftGridDataJson.push({
            'id': leftGridData[i].get('id'),
            'name': leftGridData[i].get('name'),
            'amount': leftGridData[i].get('amount'),
            'cost': leftGridData[i].get('cost'),
          });
        }
        var removecharacter = Ext.encode(leftGridDataJson);
        if(removecharacter=='[]'){
          Ext.MessageBox.alert("提示框","未选择商品!");
        }
        else{
          //ajax提交?
          Ext.getCmp('submitBtn').setDisabled(false);
          console.log(removecharacter);
          leftGrid.setData(leftGridData);//让grid回到原样.
        }
      }
    });
  },
  submitTransferForm: function (btn) {
    //以后要设置判断RetreatCheck是否为true,来确定调货单是否是残缺品处理单.
    var record = Ext.create('SupermarketInvoicingSystem.model.indent.IndentModel');
    var leftGrid = Ext.data.StoreManager.lookup('transferLeftStore');
    var leftGridData = leftGrid.getRange();
    var leftGridLength = leftGrid.getCount();
    var leftGridOriginsLength;
    var leftGridDataJson = [];

    leftGrid.load({
      scope: this,
      callback: function (records, operation, success) {
        leftGridOriginsLength = leftGrid.getCount();

        var i = leftGridOriginsLength;
        var j = leftGridLength;

        for (i, j; i < j; i++) {
          leftGridDataJson.push({
            'id': leftGridData[i].get('id'),
            'amount': leftGridData[i].get('amount')
          });
        }
        if(leftGridDataJson==[])
        {
          alert()
          Ext.data.StoreManager.lookup('indentStore').load();
          btn.up('window').close();
        }
        else{
          var removecharacter = Ext.encode(leftGridDataJson);
          Ext.getCmp('commoditiesJSON').setValue(removecharacter);
  
          console.log(Ext.getCmp('commoditiesJSON').getValue());
          // var values = win.down('form').getValues();
          // record.set(values);
          // record.save();
  
          Ext.data.StoreManager.lookup('indentStore').load();
          btn.up('window').close();
        }
        
      }
    });
    console.log(leftGridData);//这句在leftGrid.load()前执行....
  },
  searchIndentByDateorNum: function (combo, record, index) {
    var searchField = this.lookupReference('searchFieldName').getValue();
    if (searchField === 'indentTime') {
      this.lookupReference('searchIndentNumField').hide();
      this.lookupReference('searchDataFieldValue').show();
      this.lookupReference('searchDataFieldValue2').show();
    } else {
      this.lookupReference('searchIndentNumField').show();
      this.lookupReference('searchDataFieldValue').hide();
      this.lookupReference('searchDataFieldValue2').hide();
    }
  },
  submitAddForm: function (btn) {
    var indentStore = Ext.data.StoreManager.lookup('indentStore');
    var win = btn.up('window');
    var form = win.down('form');
    var record = Ext.create('SupermarketInvoicingSystem.model.indent.IndentModel');
    var leftgrid = Ext.getCmp('leftList').getStore();
    var leftgridData = leftgrid.getRange();
    var leftgridDataJson = [];
    for (var i in leftgridData) {
      leftgridDataJson.push({
        'name': leftgridData[i].get('name'),
        'num': leftgridData[i].get('num'),
        'cost': leftgridData[i].get('cost'),
        'price': leftgridData[i].get('price')
      });
    }
    var removecharacter = Ext.encode(leftgridDataJson);
    Ext.getCmp('commoditiesJSON').setValue(removecharacter);
    var values = form.getValues();
    record.set(values);
    record.save();
    Ext.getCmp('leftList').getStore().removeAll();
    indentStore.load();
    win.close();
  },
  submitEditForm: function (btn) {
    var indentStore = Ext.data.StoreManager.lookup('indentStore');
    var win = btn.up('window');
    var form = win.down('form');
    var id = Ext.getCmp('indentId').getValue();
    var record = indentStore.getById(id);
    var leftgrid = Ext.getCmp('leftList').getStore();
    var leftgridData = leftgrid.getRange();
    var leftgridDataJson = [];
    for (var i in leftgridData) {
      leftgridDataJson.push({
        'name': leftgridData[i].get('name'),
        'num': leftgridData[i].get('amount'),
        'cost': leftgridData[i].get('cost'),
        'price': leftgridData[i].get('price')
      });
    }
    var removecharacter = Ext.encode(leftgridDataJson);
    Ext.getCmp('commoditiesJSON').setValue(removecharacter);
    var values = form.getValues();
    record.set(values);
    Ext.getCmp('leftList').getStore().removeAll();
    win.close();
  },
  quickSearch: function (btn) {
    var searchField = this.lookupReference('searchFieldName').getValue();
    var searchDataFieldValue = this.lookupReference('searchDataFieldValue').getValue();
    var searchDataFieldValue2 = this.lookupReference('searchDataFieldValue2').getValue();
    var IndentNumFieldValue = this.lookupReference('searchIndentNumField').getValue();
    var store = btn.up('gridpanel').getStore();
    Ext.apply(store.proxy.extraParams, {
      startDate: '',
      endDate: '',
      indentNum: ''
    });
    if (searchField === 'indentTime') {
      Ext.apply(store.proxy.extraParams, {
        startTime: Ext.util.Format.date(searchDataFieldValue, 'Y/m/d H:i:s'),
        endTime: Ext.util.Format.date(searchDataFieldValue2, 'Y/m/d H:i:s')
      });
    } else {
      Ext.apply(store.proxy.extraParams, {
        indentNum: IndentNumFieldValue
      });
    }
    store.load({
      params: {
        start: 0,
        limit: 20,
        page: 1
      }
    });
  },
  submitSearchForm: function (btn) {
    var store = Ext.data.StoreManager.lookup('indentStore');
    var win = btn.up('window');
    var form = win.down('form');
    var values = form.getValues();
    Ext.apply(store.proxy.extraParams, {
      startTime: '',
      endTime: ''
    });
    Ext.apply(store.proxy.extraParams, {
      startTime: Ext.util.Format.date(values.startTime, 'Y/m/d H:i:s'),
      endTime: Ext.util.Format.date(values.endTime, 'Y/m/d H:i:s')
    });
    store.load({
      params: {
        start: 0,
        limit: 20,
        page: 1
      }
    });
    win.close();
  },
  deleteOneIndentRow: function (grid, rowIndex, colIndex) {
    var store = grid.getStore();
    var record = store.getAt(rowIndex);
    if (record.data.indentStatus == 'INIT') {
      Ext.MessageBox.confirm('提示', '确定要进行删除操作吗？数据将无法还原！', function (btn, text) {
        if (btn == 'yes') {
          store.remove(record);
        }
      }, this);
    } else {
      Ext.Msg.alert('提示', "只可以删除'初始化'状态的信息！");
    }
  },
  deleteOneRow: function (grid, rowIndex, colIndex) {
    var store = grid.getStore();
    var record = store.getAt(rowIndex);
    if (record.data.indentStatus == 'INIT') {
      Ext.MessageBox.confirm('提示', '确定要进行删除操作吗？数据将无法还原！', function (btn, text) {
        if (btn == 'yes') {
          store.remove(record);
        }
      }, this);
    } else {
      Ext.Msg.alert('提示', "只可以删除'初始化'状态的信息！");
    }
  },
  deleteMoreRows: function (btn, rowIndex, colIndex) {
    var grid = btn.up('gridpanel');
    var selModel = grid.getSelectionModel();
    if (selModel.hasSelection()) {
      Ext.Msg.confirm('警告', '确定要删除吗？', function (button) {
        if (button == 'yes') {
          var rows = selModel.getSelection();
          var selectIds = [];
          Ext.each(rows, function (row) {
            if (row.data.indentStatus == 'INIT') {
              selectIds.push(row.data.id);
            }
          });
          Ext.Ajax.request({
            url: '/indent/deletes',
            method: 'post',
            params: {
              ids: selectIds
            },
            success: function (response, options) {
              var json = Ext.util.JSON.decode(response.responseText);
              if (json.success) {
                Ext.Msg.alert('操作成功', json.msg, function () {
                  grid.getStore().reload();
                });
              } else {
                Ext.Msg.alert('操作失败', json.msg);
              }
            }
          });
        }
      });
    } else {
      Ext.Msg.alert('错误', '没有任何行被选中，无法进行删除操作！');
    }
  },
  starIndentProcess: function (grid, rowIndex, colIndex) {
    var record = grid.getStore().getAt(rowIndex);
    Ext.Ajax.request({
      url: '/indent/start',
      method: 'post',
      params: {
        id: record.get('id')
      },
      success: function (response, options) {
        var json = Ext.util.JSON.decode(response.responseText);
        if (json.success) {
          Ext.Msg.alert('操作成功', json.msg, function () {
            grid.getStore().reload();
          });
        } else {
          Ext.Msg.alert('操作失败', json.msg);
        }
      }
    });
  },
  cancelIndentProcess: function (grid, rowIndex, colIndex) {
    Ext.Msg.alert('Title', 'Cancel Indent Process');
  }
});
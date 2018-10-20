Ext.define('SupermarketInvoicingSystem.view.process.indent.IndentProcessGridPanel', {
  extend: Ext.panel.Panel,
  xtype: 'indentProcessGridPanel',
  layout: 'fit',
  requires: [
    'Ext.grid.Panel',
    'Ext.toolbar.Paging',
    'Ext.form.field.ComboBox',
    'Ext.selection.CheckboxModel',
    'Ext.form.field.Date',
    'Ext.grid.column.Date',
    'Ext.grid.plugin.*'
  ],

  items: [{
    xtype: 'gridpanel',
    title: 'IndentGrid Results',
    bind: '{indentProcessLists}',
    scrollable: false,
    selModel: {
      type: 'checkboxmodel'
    },
    columns: [{
        header: 'id',
        dataIndex: 'id',
        width: 60,
        sortable: true,
        hidden: true
      },
      {
        header: 'indentNum',
        dataIndex: 'indentNum',
        width: 180,
        align:'center',
      },
      {
        header: 'createDate',
        dataIndex: 'createDate',
        align:'center',
        width: 180,
        sortable: true,
        renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s')
      },
      
      {
        header: 'creatorName',
        dataIndex: 'creator',
        width: 120,
        align:'center',
        renderer: function (val) {
          return val.name;
        }
      },
      {
        header: 'indentType',
        dataIndex: 'indentType',
        align:'center',
        width: 100,
        sortable: true,
        renderer: function (val) {
          //console.log(val);
          if (val == 'PURCHASE') {
            return '<span style="color:green;">采购单</span>';
          } else if (val == 'TRANSPORT') {
            return '<span style="color:orange;">内部调货单</span>';
          } else if (val == 'TO_SHOP') {
            return '<span style="color:blue;">超市调货单</span>';
          } else if (val == 'RETREAT') {
            return '<span style="color:red;">残品处理单</span>';
          } else {
            return val;
          }
        }
      },
      {
        header: 'indentStatus',
        dataIndex: 'indentStatus',
        align:'center',
        width: 120,
        sortable: true,
        renderer: function (val) {
            if (val == 'CHECKING') {
            return '<span style="color:green;">待审核</span>';
          } else if (val == 'APPROVED') {
            return '<span style="color:orange;">审核通过/提货中</span>';
          } else if (val == 'EXTRACTING') {
            return '<span style="color:orange;">入库清点中</span>';
          } else if (val == 'FINISHED') {
            return '<span style="color:orange;">订单完成</span>';
          } else {
            return '<span style="color:red;">订单异常</span>';
          }
          return val;
        }
      },
      {
        header: 'note',
        dataIndex: 'note',
         align:'center',
        width: 220,
        flex:1,
        sortable: true
      },
      {
        xtype: 'actioncolumn',
        cls: 'content-column',
        width: 120,
        text: 'Actions',
        
        items: [{
            xtype: 'button',
            tooltip: '查看订单 ',
            iconCls: 'x-fa fa-object-group',
            handler: 'openIndentProcessLookupWindow'//需要修改读取indentType来选择窗口.
          },
          {
            xtype: 'button',
            iconCls: 'x-fa fa-close',
            tooltip: '审核订单',
            handler: 'checkIndent'
          },
          {
            xtype: 'button',
            iconCls: 'x-fa fa-star',
            tooltip: '发起申请',
            getClass: function (v, meta, rec) {
              if (rec.get('processInstanceId') != '') {
                return 'x-hidden';
              }
              return 'x-fa fa-star';
            },
            handler: 'starIndentProcess'
          }, {
            xtype: 'button',
            iconCls: 'x-fa fa-ban',
            tooltip: '取消申请',
            getClass: function (v, meta, rec) {
              if (rec.get('processInstanceId') == '') {
                return 'x-hidden';
              }
              return 'x-fa fa-ban';
            },
            handler: 'cancelIndentProcess'
          }
        ]
      }
    ],
      plugins: {
        rowexpander: {
            rowBodyTpl: new Ext.XTemplate(
                 '<p>订单编号：{indentNum}</p>',
                 '<p>最后修改日期：{createDate:this.formatChange}</p>',
                 '<p>创建人:{creator.name}</p>',
                 '<p>状态：{indentStatus}</p>',
                 '<p>备注：{note}</p>',
                 '<p>总成本：{cost}</p>',
                 '<p>进货点：{toWarehouse.location.address}  {toWarehouse.name}</p>',
                 {                
                      formatChange:function(v) { 
                      var year = v.getFullYear(); 
                      var month = v.getMonth() + 1; 
                      var day = v.getDate(); 
                      var hour = v.getHours(); 
                      var minute = v.getMinutes(); 
                      var second = v.getSeconds(); 
                      return year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second ; 
                    
                      } 
                }
                )
        }
    },
    
    tbar: [{
        xtype: 'combobox',
        reference: 'searchFieldName',
        hideLabel: true,
        store: Ext.create('Ext.data.Store', {
          fields: ['name', 'value'],
          data: [
            {name: '创建时间', value: 'indentTime' }
            ,{name: '订单编号', value: 'indentNum' }
          ]
        }),
        displayField: 'name',
        valueField: 'value',
        value: 'indentTime',
        editable: false,
        queryMode: 'local',
        triggerAction: 'all',
        emptyText: 'Select a state...',
        width: 135,
        listeners: {
          select: 'searchIndentByDateorNum'
        }
      }, '-', {
        xtype: 'textfield',
        hideLabel: true,
        reference: 'searchIndentNumField',
        name: 'IndentNumFieldValue',
        hidden:true
      }, {
        xtype: 'datefield',
        format: 'Y/m/d',
        reference: 'searchDataFieldValue',
        fieldLabel: 'From',
        labelWidth:40,
        name: 'from_date'
      }, {
        xtype: 'datefield', 
        format: 'Y/m/d',
        reference: 'searchDataFieldValue2',
        fieldLabel: 'To',
        labelWidth:30,
        name: 'to_date'
      }, '-',
      {
        text: 'Search',
        iconCls: 'fa fa-search',
        handler: 'quickSearch'
      }, /*'-', {
        text: 'Search More',
        iconCls: 'fa fa-search-plus',
        handler: 'openSearchWindow'
      },*//* '-\x3e', {
        text: 'Add-P',
        tooltip: 'Add a new indent row',
        iconCls: 'fa fa-cart-plus',
        handler: 'openAddIndentWindow'
      }, '-', {
        text: 'Add-T',
        tooltip: 'Add a new transfer row',
        iconCls: 'fa fa-plus',
        handler: 'openAddTransferWindow'
      }, '-', {
        text: 'Removes',
        tooltip: 'Remove the selected item',
        iconCls: 'fa fa-trash',
        itemId: 'indentGridPanelRemove',
        disabled: true,
        handler: 'deleteMoreRows'
      }*/
    ],
    dockedItems: [{
      xtype: 'pagingtoolbar',
      dock: 'bottom',
      displayInfo: true,
      bind: '{indentProcessLists}'
    }],
    listeners: {
      selectionchange: function (selModel, selections) {
        this.down('#indentGridPanelRemove').setDisabled(selections.length === 0);
      }
    }
  }]
});
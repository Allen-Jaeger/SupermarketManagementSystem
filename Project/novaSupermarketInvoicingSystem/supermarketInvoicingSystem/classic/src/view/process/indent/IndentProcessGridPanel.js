Ext.define('SupermarketInvoicingSystem.view.process.indent.IndentProcessGridPanel', {
  extend: Ext.panel.Panel,
  xtype: 'indentProcessGridPanel',
  layout: 'fit',
  id:'indentProcessGridPanel',
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
    
    columns: [{
        header: 'id',
        dataIndex: 'id',
        width: 60,
        sortable: true,
        hidden: true
      },{
        header: '签收操作',
        dataIndex: 'manager',
        width: 100,
        renderer:function(val, cellmeta, record, rowIndex, columnIndex, store){
        if(record.data.taskClaimTime == null){
          if(record.data.taskName == '订单审批' &&document.getElementById('loginUserName').innerHTML != '温俊超')
          return'<button id="claimButton" hidden=true>无效</button>';
        else  return '<button id="claimButton">签收</button>';
        }
         if(record.data.taskName == '负责人审批') {
          return'<button>审批</button>';
        }
         
        if(record.data.taskName == '订单审批') {
          if(document.getElementById('loginUserName').innerHTML != '温俊超')
          return'<button id="checkingButton" hidden=true>无效</button>';
          else return '<button id="checkingButton">审批</button>';
        }
         if(record.data.taskName == '通知取货')
          return'<button>通知取货</button>';
         if(record.data.taskName == '仓库管理员审查')
          return'<button>完成审查</button>';
         if(record.data.taskName == '确认收货')
            return'<button>确认收货</button>';
         if(record.data.taskName == '申请退回')
            return'<button>申请退回</button>';
        },
        listeners:{
          click:'signIndent'
        }
      },
      {
        header: 'indentNum',
        dataIndex: 'indentNum',
        width: 180,
        align:'center',
      },{
        header: 'taskId',
        dataIndex: 'taskId',
        width: 180,
        align:'center',
        hidden:true,
        
      },
       {
        header: 'taskName',
        dataIndex: 'taskName',
        width: 180,
        align:'center',
        hidden:true,
        
      },
      {
        header: 'taskClaimTime',
        dataIndex: 'taskClaimTime',
        width: 180,
        align:'center',
        hidden:true,
      },{
        header: 'processInstanceId',
        dataIndex: 'processInstanceId',
        width: 180,
        align:'center',
        hidden:true,
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
       //id:'creatorName',
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
            return '<span style="color:blue;">入库清点中</span>';
          } else if (val == 'FINISHED') {
            return '<span style="color:grey;">订单完成</span>';
          } else if (val == 'DISAPPROVED') {
            return '<span style="color:red;">审核不通过/待修改</span>';
          } else if (val == 'ROUND_GET') {
            return '<span style="color:yellow;">入库不通过/待提货</span>';
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
            tooltip: '修改订单 ',
            getClass: function (v, meta, rec) {
              if (rec.get('indentStatus') != 'DISAPPROVED') {
                return 'x-hidden';
              }
              return 'x-fa fa-pencil';
            },
            listeners:{click:function(){
                  Ext.msg.alert("请到货单申请模块修改");
                }
            }//需要修改读取indentType来选择窗口.
            
          }, {
            xtype: 'button',
            tooltip: '重新提交',
            getClass: function (v, meta, rec) {
              if (rec.get('indentStatus') != 'DISAPPROVED') {
                return 'x-hidden';
              }
              return 'x-fa fa-star';
            },
            handler: 'reSubmitIndentProcess'
          }, {
            xtype: 'button',
            tooltip: '取消申请',
            getClass: function (v, meta, rec) {
              if (rec.get('indentStatus') != 'DISAPPROVED' && rec.get('indentStatus') != 'CHECKING') {
                return 'x-hidden';
              }
              return 'x-fa fa-ban';
            },
            handler: 'cancelIndentProcess'
          }, {
            xtype: 'button',
            tooltip: '查看实时流程',
            getClass: function (v, meta, rec) {
              if (rec.get('indentStatus') == 'INIT' || rec.get('indentStatus') == 'ERROR') {
                return 'x-hidden';
              }
              return 'x-fa fa-tasks';
            },
            handler: 'onClickGraphTrace'
          }
       ]
      }
    ],
      
    
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
     
    }
  }]
});
﻿Ext.define('SupermarketInvoicingSystem.view.indent.IndentGridPanel', {
  extend: Ext.panel.Panel,
  xtype: 'indentGridPanel',
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
    bind: '{indentLists}',
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
        header: 'indentStatus',
        dataIndex: 'indentStatus',
        align:'center',
        width: 120,
        sortable: true,
        renderer: function (val) {
          if (val == 'INIT') {
            return '<span style="color:green;">初始化</span>';
          } else if (val == 'CHECKING') {
            return '<span style="color:blue;">审核中</span>';
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
        tooltip: '修改订单 ',
        items: [{
            xtype: 'button',
            iconCls: 'x-fa fa-pencil',
            handler: 'openEditWindow'
          },
          {
            xtype: 'button',
            iconCls: 'x-fa fa-close',
            tooltip: '删除订单',
            handler: 'deleteOneIndentRow'
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
                 '<p>最后修改日期：{createDate}</p>',
                 '<p>创建人:{creator.name}</p>',
                 '<p>状态：{indentStatus}</p>',
                 '<p>备注：{note}</p>',
                 '<p>总成本：{cost}</p>',
                 '<p>进货点：{toShop.location.address}  {toShop.name}</p>',
                 '<p>进货点：{afterRender:this.toWhere}</p>',
                 {
                    toWhere: function (v) {
                       
                        return Ext.util.get
                           
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
      },*/ '-\x3e', {
        text: 'Add-P',
        tooltip: 'Add a new purchase row',
        iconCls: 'fa fa-cart-plus',
        handler: 'openAddPurchaseWindow'
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
      }
    ],
    dockedItems: [{
      xtype: 'pagingtoolbar',
      dock: 'bottom',
      displayInfo: true,
      bind: '{indentLists}'
    }],
    listeners: {
      selectionchange: function (selModel, selections) {
        this.down('#indentGridPanelRemove').setDisabled(selections.length === 0);
      }
    }
  }]
});
Ext.define('SupermarketInvoicingSystem.view.indent.IndentAddWindow', {
    extend:'Ext.window.Window',
  
    alias: 'widget.indentAddWindow',
    id:'indentAddWindow',
    height: 550,
    minHeight: 350,
    minWidth: 300,
    width: 820,
    scrollable: true,
    resizable:true,
    title: 'Add Indent Window',
    closable: true,
    constrain: true,
    defaultFocus: 'textfield',
    modal:true,
    layout: 'fit',
    maximizable:true,
    listeners:{resize:'autoAdapting',
              close:function(btn) {
                Ext.getCmp('leftList').getStore().removeAll();
            }
    },
    
    defaults: {
        bodyPadding: 10
   },
    items: [{
     scrollable: true,
        xtype: 'form',
        layout: 'form',
        padding: '10px',
        ariaLabel: 'Enter your name',
    items: [
    //id
    {xtype: 'textfield',fieldLabel: 'id',name:'id',hidden: true}
    //订单状态:默认为创建
    ,{xtype: 'textfield',fieldLabel: 'indentStatus', name:'indentStatus',value:'INIT',hidden: true,readOnly: true}
    ,{xtype: 'textfield',fieldLabel: 'indentType', name:'indentType',value:'PURCHASE',hidden: true,readOnly: true}
    //订单类型:默认为订货单，枚举类型
    //{xtype: 'textfield',fieldLabel: 'indentType',name:'indentType',hidden: true,value:'1'}
    //订单编号：自动生成 随机
    //,{xtype: 'textfield',fieldLabel: 'indentNum',name:'indentNum',hidden: true}
    //生成日期
    //,{xtype: 'datefield',fieldLabel: 'createDate',name:'createDate',hidden: true}
    ,{
      xtype: 'displayfield',
      name: 'creatorId',
      fieldLabel: '订单创建者',
      id:'creatorId',
      editable:false,
     },
    {
      xtype: 'fieldcontainer',
      fieldLabel: '进货仓库',
      layout:"hbox" ,
      //name:'',
      //id:'',
        items:[
            /*{
                xtype     : 'combobox',
                name      : 'placeType',
                id:'placeType',
                width: 100,
                store:Ext.create('Ext.data.Store', {
                      fields:['name', 'value'], 
                      data:[
                       {name:'仓库',value:'WARE'}
                        
                 ]}),
                displayField:'name',
                valueField:'value', 
                value:'WARE', 
                editable:false, 
                queryMode:'local',
                listeners:{
                      select:'displaySelectedPlaceList',

                  
                }
            },*/
            {
                xtype     : 'combobox',
                name      : 'toWarehouseId',
                id:'toWarehouseId',
                width: 150,
                //hidden:true,
                store:{type:'wareStore'},
                displayField:'name',
                valueField:'index', 
                emptyText:'请选择',
                editable:false, 
                queryMode:'local',
                listeners:{
                  afterRender:function(){
                      Ext.getCmp('toWarehouseId').store.load();
                  },
                  //select:'displayShopOrWareCommoditiesInfo',
                }
            }
         ]
     },
     {
          xtype:'textfield',
          hidden:'true',
          id:'commoditiesJSON',
          name:'commoditiesJSON'

        },
    {
      xtype: 'fieldcontainer',
      fieldLabel: '添加商品',
      layout:"hbox" ,
      height:300,
      name:'commoditiesList',
      id:'commoditiesList',
        items:[
          {
          xtype:'gridpanel',
          id:'leftList',
          name:'leftList',
          bind: '{leftList}',
          width:123456789,
          border:1,
          height:300,
          scrollable:true,
          resizable:true,
          enableKeyEvents:true,
          selModel: {type: 'checkboxmodel'},
          listeners:{resize:function(){
                var flexWidth = Ext.getCmp('indentAddWindow').width -160;
                var middleButtonWidth = flexWidth*0.1;
                var leftListWidth = Ext.getCmp('leftList').width;
                var rightListWidth = flexWidth - middleButtonWidth - leftListWidth;
                
                Ext.getCmp('rightList').setWidth(rightListWidth);
                 }
          },
           plugins: {
              ptype: 'cellediting',
              clicksToEdit: 1,
              
          },
          columns:[
            {header: 'name' ,dataIndex:'name',width: 60,sortable: true,flex:4}
            ,{header: 'num',dataIndex:'num',width: 60,sortable: true,flex:1.5, 
              editor: {xtype:'textfield',
                         selectOnEdit :true,
                          listeners:{change:'updateSingleCost'}
                       }
             }
             , {header: 'barCode',dataIndex:'barCode',width: 60,sortable: true,hidden:true}
             , {header: 'note',dataIndex:'note',width: 60,sortable: true,hidden:true}
             , {header: 'picUrl',dataIndex:'picUrl',width: 60,sortable: true,hidden:true}
             , {header: 'commodityType',dataIndex:'commodityType',width: 60,sortable: true,hidden:true}
            ,{header: 'cost',dataIndex:'cost',width: 60,sortable: true,hidden:true}
            ,{header: 'price',dataIndex:'price',width: 60,sortable: true,flex:1.5},
            {xtype: 'actioncolumn',cls: 'content-column', width: 80,text: 'Actions',tooltip: 'edit ',flex:1.5,
              items: [
                {xtype: 'button', iconCls: 'x-fa fa-minus',handler: 'deleteOneSelectedIndent'}
              ]
            }
          ],
          
        },
          {
          xtype:'panel',
          name:'middleButton',
          id:'middleButton',
          height:300,
          layout: {align: 'middle',pack: 'center',type: 'vbox'},        
          items:[
              {xtype: 'button', iconCls: 'x-fa fa-arrow-left',handler: 'addSelectedIntoselectcommoditiesList'},
              {xtype: 'button', iconCls: 'x-fa fa-arrow-right',handler: 'cancelselectcommoditiesList'}
          ]
          
        }
        ,
        {
          xtype:'gridpanel',
          marginLeft:20,
          bind: '{commodityList}',
          height:300,
          width:123456789,
          paddingLeft:20,
          scrollable:true,
          selModel: {type: 'checkboxmodel'},
          name:'rightList',
          id:'rightList',
          border:1,
          columns: [
             {header: 'id',dataIndex:'id',width: 60,sortable: true,hidden:true}
             , {header: 'name',dataIndex:'name',width: 60,sortable: true,flex:6}
             , {header: 'cost',dataIndex:'cost',width: 60,sortable: true,flex:2}
             , {header: 'barCode',dataIndex:'barCode',width: 60,sortable: true,hidden:true}
             , {header: 'note',dataIndex:'note',width: 60,sortable: true,hidden:true}
             , {header: 'picUrl',dataIndex:'picUrl',width: 60,sortable: true,hidden:true}
             , {header: 'commodityType',dataIndex:'commodityType',width: 60,sortable: true}
             ,{xtype: 'actioncolumn',cls: 'content-column', width: 80,text: 'Actions',tooltip: 'edit ',flex:2,
              items: [
                {xtype: 'button', iconCls: 'x-fa fa-plus',handler: 'addOneIntoselectcommoditiesList'}
              ]
              }
          ],
          tbar:[
          {xtype:'combobox', 
            id:'commodityType',
            hideLabel:true, 
            store:Ext.create('Ext.data.Store', {
            fields:['name', 'value'], 
            data:[
              {name:'全部',value:''}
              ,{name:'粮油零食', value:'FOOD'}
              ,{name:'酒水饮料',value:'DRINK'}
              ,{name:'家居清洁',value:'DAILY'}
              ,{name:'电器',value:'ELETRICAL'}
              ,{name:'厨房用品',value:'COOKER'}
              ,{name:'美容洗浴',value:'BATH'}
              ,{name:'母婴用品',value:'INFANT'}
              ,{name:'果蔬生鲜',value:'FRESH'}

              
            ]}),  
            displayField:'name',
            valueField:'value', 
            value:'', 
            editable:false, 
            queryMode:'local',
            triggerAction:'all',
            emptyText:'Select a state...',
            width:125, 
            listeners:{select:'searchByCommodityType'}
          }, 
            '-', 
          {
            xtype: 'combobox',
            id:'commoditySearchField',
            displayField: 'name',
            anchor: '-15',
            store: {
                type: 'commoditiesStore'
            },
            valueField:'name', 
            // We're forcing the query to run every time by setting minChars to 0
            // (default is 4)
            minChars: 0,
            queryParam: 'q',
            queryMode: 'remote',
            listConfig: {
                itemTpl: [
                    '<div data-qtip="{name}">{name}</div>'
                ]
            },
            listeners:{
              select:'searchByCommodityKey',
              change:'searchByCommodityKey'
            }
          },
              
            {
              text:'Search', 
              iconCls:'fa fa-search', 
              handler:'resetSearchCommodityList'
            }, 
            
              
        ],
        },
        {//隐藏栏
          xtype: 'button', 
          name:'displayorhiderightButton',
          id:'displayorhiderightButton',
          width:10,
          height:300,
          iconCls: 'x-fa fa-arrow-left',
          handler: 'displayorhideright'
          
          
          
        }
      ] 
    },{
      xtype     : 'textfield',
      name      : 'cost',
      id        : 'cost',
      fieldLabel: '总成本',
      editable  :false
      
    },
    
     {
      xtype     : 'textareafield',
      grow      : true,
      name      : 'note',
      fieldLabel: '备注',
      anchor    : '100%'
    }]
    }],
  buttons: ['->',{
        xtype: 'button',
        text: 'Submit',
        handler: 'submitAddForm'
    },{
        xtype: 'button',
        text: 'Close',
        handler: function(btn) {
            Ext.getCmp('leftList').getStore().removeAll();
            btn.up('window').close();
        }
    },'->']
});
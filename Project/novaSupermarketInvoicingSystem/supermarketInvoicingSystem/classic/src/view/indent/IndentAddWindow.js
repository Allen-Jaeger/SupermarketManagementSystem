Ext.define('SupermarketInvoicingSystem.view.indent.IndentAddWindow', {
    extend:'Ext.window.Window',
  
    alias: 'widget.indentAddWindow',
    id:'indentAddWindow',
    height: 550,
    minHeight: 350,
    minWidth: 300,
    width: 820,
    scrollable: true,
    resizable:false,
    title: 'Add Indent Window',
    closable: true,
    constrain: true,
    defaultFocus: 'textfield',
    modal:true,
    layout: 'fit',
    maximizable:true,
    listeners:{resize:'adaptMax',},
    
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
    //订单类型:默认为订货单，枚举类型
    //{xtype: 'textfield',fieldLabel: 'indentType',name:'indentType',hidden: true,value:'1'}
    //订单编号：自动生成 随机
    //,{xtype: 'textfield',fieldLabel: 'indentNum',name:'indentNum',hidden: true}
    //生成日期
    //,{xtype: 'datefield',fieldLabel: 'createDate',name:'createDate',hidden: true}
    ,{
      xtype: 'textfield',
      name: 'creatorId',
      fieldLabel: '订单创建者',
      id:'creatorId',
      editable:false,
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
      name:'commoditiesList',
      id:'commoditiesList',
        items:[
       




        {
          xtype:'gridpanel',
          id:'leftList',
          name:'leftList',
          bind: '{leftList}',
          width:820*0.25,
          height:300,
          scrollable:true,
          selModel: {type: 'cellmodel'},
         
           plugins: {
              ptype: 'cellediting',
              clicksToEdit: 1,
              
          },
          columns:[
            {header: 'name' ,dataIndex:'name',width: 60,sortable: true,flex:1}
            ,{header: 'num',dataIndex:'num',width: 60,sortable: true
              , editor: {xtype:'textfield',
                          listeners:{change:'updateSingleCost'},
                           
                        }
              
            }
            ,{header: 'cost',dataIndex:'cost',width: 60,sortable: true,hidden:true}
            ,{header: 'cost2',dataIndex:'cost2',width: 60,sortable: true}
          ],
          
        },
          {
          xtype:'panel',
          name:'middleButton',
          id:'middleButton',
          width:820*0.05,
          height:300,
          layout: {align: 'middle',pack: 'center',type: 'vbox'},        
          items:[
              {xtype: 'button', iconCls: 'x-fa fa-arrow-left',handler: 'addIntoselectcommoditiesList'},
              {xtype: 'button', iconCls: 'x-fa fa-arrow-right',handler: 'cancelselectcommoditiesList'}
          ]
          
        }
        ,
        {
          xtype:'gridpanel',
          marginLeft:20,
          bind: '{commodityList}',
          width:820*0.5,
          height:300,
          paddingLeft:20,
          scrollable:true,
          selModel: {type: 'checkboxmodel'},
          name:'rightList',
          id:'rightList',
          columns: [
             {header: 'id',dataIndex:'id',width: 60,sortable: true}
             , {header: 'name',dataIndex:'name',width: 60,sortable: true,flex:1
                  
           }
             , {header: 'cost',dataIndex:'cost',width: 60,sortable: true}
             ,{xtype: 'actioncolumn',cls: 'content-column', width: 80,text: 'Actions',tooltip: 'edit ',
              items: [
                {xtype: 'button', iconCls: 'x-fa fa-plus',handler: ''}
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
            value:'全部', 
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
            
            displayField: 'name',
            anchor: '-15',
            store: {
                type: 'commoditiesStore'
            },

            // We're forcing the query to run every time by setting minChars to 0
            // (default is 4)
            minChars: 0,
            queryParam: 'q',
            queryMode: 'remote',
            listConfig: {
                itemTpl: [
                    '<div data-qtip="{name}">{name}</div>'
                ]
            }
          },
              
            {
              text:'Search', 
              iconCls:'fa fa-search', 
              handler:'quickSearch'
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
      xtype: 'fieldcontainer',
      fieldLabel: '进货点',
      layout:"hbox" ,
      //name:'',
      //id:'',
        items:[{
              xtype:'displayfield',
              value:'类型:',
              width:40
            },
            {
                xtype     : 'combobox',
                name      : 'toshop',
                width: 100,
                store:Ext.create('Ext.data.Store', {
                      fields:['name', 'value'], 
                      data:[
                        {name:'仓库',value:'warehouse'}
                        ,{name:'门店', value:'shop'}
                 ]}),
                displayField:'name',
                valueField:'value', 
                value:'仓库', 
                editable:false, 
                queryMode:'local',
            },
            {
                xtype:'displayfield',
                value:'地点:',
                width:40,
            },
            {
                xtype     : 'combobox',
                name      : 'toshop1',
                width: 100,
                store:Ext.create('Ext.data.Store', {
                      fields:['name', 'value'], 
                      data:[
                        {name:'北京省',value:'北京省'}
                        ,{name:'广东省', value:'广东省'}
                 ]}),
                displayField:'name',
                valueField:'value', 
                value:'请选择', 
                editable:false, 
                queryMode:'local',
            },
            {
                xtype:'displayfield',
                value:'id:',
                width:40,
            },
            {
                xtype:'textfield',
                id:'toshopid',
                name:'toShop'

            }


        ]
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
            btn.up('window').close();
        }
    },'->']
});
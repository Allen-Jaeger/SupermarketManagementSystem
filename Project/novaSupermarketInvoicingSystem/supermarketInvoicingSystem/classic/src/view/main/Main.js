Ext.define('SupermarketInvoicingSystem.view.main.Main', {
    extend: 'Ext.container.Viewport',

    requires: [
        'Ext.button.Segmented',
        'Ext.list.Tree',
        'Ext.data.schema.Schema',
        'Ext.data.reader.Reader',
        'Ext.data.writer.Writer'
    ],

    controller: 'main',
    viewModel: 'main',

    cls: 'sencha-dash-viewport',
    itemId: 'mainView',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    listeners: {
        render: 'onMainViewRender'
    },

    items: [
        {
            xtype: 'toolbar',
            cls: 'sencha-dash-dash-headerbar shadow',
            height: 64,
            itemId: 'headerBar',
            items: [
                {
                    xtype: 'component',
                    reference: 'senchaLogo',
                    cls: 'sencha-logo',
                    html: '<div class="main-logo"><img id="logoimg" src="resources/images/logoNova.png" width="80%";/><span style="font-weight: lighter;color: white;">Supermarket</span></div>',
                    width: 64
                },
                {
                    margin: '0 0 0 8',
                    ui: 'header',
                    iconCls:'x-fa fa-navicon',
                    id: 'main-navigation-btn',
                    handler: 'onToggleNavigationSize'
                },
                '->',//使用查找
                {
                    xtype: 'tbtext',
                    text: '用户名:SupermarketInvoicingSystem',
                    id:'loginUserName',
                    cls: 'top-user-name'
                },{
                    xtype: 'image',
                    cls: 'header-right-profile-image',
                    id:'toolBarIcon',
                    height: 35,
                    width: 35,
                    alt:'current user image',
                    //src: 'resources/images/user-profile/2.png'
                },{
                    iconCls:'x-fa fa-sign-out',
                    ui: 'header',
                    tooltip: 'Logout',
                    handler: 'logoutButton'
                }
            ],
            listeners:{
                afterRender: function(view) {
                    var record = Ext.data.StoreManager.lookup('personStoreId');
                    record.load();
                    record.on("load", function() {  
                      //console.log("shit");
                      //console.log(record.getAt(0).data.content[0].name);
                      record = record.getAt(0).data.content[0];
                      Ext.getCmp('toolBarIcon').getEl().dom.src = '../../../../../resources/usersIcon/' + record.iconUrl;
                      Ext.getCmp('loginUserName').getEl().dom.innerHTML = record.name;
                    }); 
                    // let menuTree = Ext.data.StoreManager.lookup('MenuTreeId');
                    // let child = {text: "Collapsed leaf node 1",leaf: true};
                    // let children = [];
                    // children = menuTree.data.children;
                    // children[children.length]=child;
                    // menuTree.root = {expanded: true,children:[{text:'shit'}]};
                    // console.log(menuTree);
                }
            },
        },
        {
            xtype: 'maincontainerwrap',
            id: 'main-view-detail-wrap',
            reference: 'mainContainerWrap',
            flex: 1,
            items: [
                {
                    xtype: 'treelist',
                    reference: 'navigationTreeList',
                    itemId: 'navigationTreeList',
                    ui: 'nav',
                    micro: true,
                    store: 'NavigationTree',
                    width: 64,
                    expanderFirst: false,
                    expanderOnly: false,
                    listeners: {
                        selectionchange: 'onNavigationTreeSelectionChange',
                    }
                },
                {
                    xtype: 'container',
                    flex: 1,
                    reference: 'mainCardPanel',
                    cls: 'sencha-dash-right-main-container',
                    itemId: 'contentPanel',
                    layout: {
                        type: 'card',
                        anchor: '100%'
                    }
                }
            ],
        }
    ]
});

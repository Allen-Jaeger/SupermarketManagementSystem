Ext.define('SupermarketInvoicingSystem.Application', {
    extend: 'Ext.app.Application',
    
    name: 'SupermarketInvoicingSystem',

    stores: [
        'NavigationTree'
    ],

    //defaultToken : 'login',//默认首页为登录页面
	defaultToken : 'dashboard',
    // The name of the initial view to create. This class will gain a "viewport" plugin
    // if it does not extend Ext.Viewport.
    //
    mainView: 'SupermarketInvoicingSystem.view.main.Main',

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    },
    // init:function(){
    //     let rootStore = Ext.create('Ext.data.Store',{
    //         model:'SupermarketInvoicingSystem.model.MenuTreeModel',
    //         proxy:{
    //             type:'ajax',
    //             url:'/getMenu',
    //             reader : {  
    //                 type : 'json',  
    //                 // rootProperty  : 'root',
    //             }
    //         },
    //     });
    //     rootStore.load();
    //     rootStore.on('load',function(){
    //         console.log(rootStore.getAt(0));
    //         let newRoot2 = rootStore.getAt(0).data;
    //         Ext.data.StoreManager.lookup('NavigationTree').setRoot(newRoot2);
    //     });
    // }
});

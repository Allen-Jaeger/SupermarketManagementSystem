Ext.define('SupermarketInvoicingSystem.model.MenuTreeModel', {
    extend: 'Ext.data.TreeModel',
    //alias: 'model.userMsg.personModel',
    fields: [
        {name: 'expanded',type: 'auto'},
        {name: 'children',type: 'auto'},
        {name: 'iconCls',type: 'auto'},
        {name: 'text',type: 'auto'},
        {name: 'viewType',type: 'auto'},
        {name: 'routeId',type: 'auto'},
        {name: 'leaf',type: 'auto'},
        {name: 'selectable',type: 'auto'},
    ],
});
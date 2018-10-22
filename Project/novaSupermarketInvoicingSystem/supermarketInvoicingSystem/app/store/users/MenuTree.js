// Ext.define('SupermarketInvoicingSystem.store.users.MenuTree', {
//     extend: 'Ext.data.TreeStore',

//     storeId: 'MenuTreeId',
//     model:'SupermarketInvoicingSystem.model.MenuTreeModel',
//     data:[{expanded: true, children: [{
//         text: "Leaf node (<i>no folder/arrow icon</i>)",
//         leaf: true,}]}],
//     proxy:{
//         type: 'ajax',
//         url: '/getMenu',
//         reader : {  
//             type : 'json',  
//             rootProperty  : 'root',
//         }
//     },
//     autoLoad: true,
// });
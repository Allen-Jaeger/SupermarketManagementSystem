Ext.define('SupermarketInvoicingSystem.store.userMsg.PersonStore', {
    extend: 'Ext.data.Store',
    alias: 'store.personStore',
	model:'SupermarketInvoicingSystem.model.userMsg.PersonModel',
	storeId: 'personStoreId',
	// data:[
	// 		{id:'scc1',
	// 		workNum:'scc2',
	// 		password:'scc3',
	// 		name:'scc4',
	// 		gender:'scc5',
	// 		identity:'scc6',
	// 		userType:'scc7',
	// 		privileges:'scc8',
	// 		hireDate:'2019-08-18',
	// 		iconUrl:'resources/usersIcon/defaultUser.jpg',
	// 		userStatus:'scc000',
	// 		depName:'scc0000'}
	// ],
	pageSize: 1,
    proxy: {
        type: 'ajax',
        url: '/findMe',
        reader : {  
            type : 'json',  
            //rootProperty  : 'content'
            // totalProperty : 'totalElements',
        },
        simpleSortMode: true,
        actionMethods: {
            read: 'GET',
        },
    },
    remoteSort: true,
    //sorters: [{ property: 'workNum',direction: 'desc'}],
    autoLoad: true,
    listeners: {
      endUpdate: function(){
        // this.data.map['try'].data = this.data.map['2'].data;
        // console.log(this.data.map['try']);
      }
    }
});
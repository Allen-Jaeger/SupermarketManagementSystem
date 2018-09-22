Ext.define('SupermarketInvoicingSystem.store.order.OrderGridStroe', {
    extend: 'Ext.data.Store',
    alias: 'store.orderGridStroe',
	fields: [
	    {type: 'int',name: 'identifier'},
	    {type: 'string',name: 'fullname'},
	    {type: 'string',name: 'email'},
	    {name: 'subscription'},
	    {type: 'date', name: 'joinDate'},
	    {type: 'boolean',name: 'isActive' },
	    {name: 'profile_pic'}
	],
	data: {
		'lists':[{
	        "identifier": 1,
	        "fullname": "Archie Young",
	        "profile_pic": "1.png",
	        "email": "dwatkins@mydeo.name",
	        "subscription": "minima",
	        "joinDate": "10/16/2012",
	        "isActive": false
	    },{
	        "identifier": 2,
	        "fullname": "May Williams",
	        "profile_pic": "2.png",
	        "email": "jreid@babbleblab.com",
	        "subscription": "ab",
	        "joinDate": "6/13/2004",
	        "isActive": true
    	}]
    },
    proxy: {
        type: 'memory',
        //url: '~api/search/users'	//mvc url  xxx.json
	    reader:{
	    	type:'json',
	    	rootProperty:'lists'
	    }
    },

    autoLoad: 'true',

    sorters: {
        direction: 'ASC',
        property: 'fullname'
    }
});

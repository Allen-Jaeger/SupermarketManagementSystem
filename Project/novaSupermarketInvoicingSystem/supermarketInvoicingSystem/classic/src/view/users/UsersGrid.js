var allDepStore = Ext.create('Ext.data.Store', {
    fields: ['index', 'name'],
    proxy: {
        type: 'ajax',
        url: '/getAllDep',
        reader: {
            type: 'json',
        },
        method: 'GET',
    },
    autoLoad: true
});

Ext.define('SupermarketInvoicingSystem.view.users.UsersGrid', {
    extend: 'Ext.panel.Panel',
    xtype: 'usersGrid',
    //title: '管理用户信息',
    requires: [
        'Ext.grid.Panel',
        'Ext.toolbar.Paging',
        'Ext.grid.column.Date'
    ],
    items: [{
        margin:'20',
        xtype: 'gridpanel',
        title: '管理用户信息',
        iconCls: 'fa fa-street-view',
        bind: '{allUsers}',
        scrollable: true,
        tbar: [{
            xtype:'textfield',
            // text: '工号、姓名、身份证',
            // iconCls: 'fa fa-search',
            // handler: 'quickSearch'
            emptyText: '工号、姓名、身份证',
            id:'tbarTextId',
        },{
            text: '过滤',
            iconCls: 'fa fa-filter',
            handler: 'filter'
        },{
            text: '取消过滤',
            iconCls: 'fa fa-reply fa-filter',
            handler: 'cancelFilter'
        },
        // 暂弃功能
        // '-',{
        //     emptyText: '按部门查看员工',
        //     xtype: 'combobox',
        //     editable: false,
        //     selectOnFocus: false, 
        //     store: allDepStore,
        //     queryMode: 'remote',
        //     displayField: 'name',
        //     valueField: 'index',
        //     listeners:{
        //         change:function(){
        //             var v = this.getValue();
        //             var depUserStore = Ext.create('Ext.data.Store', {
        //                 model: 'SupermarketInvoicingSystem.model.userMsg.PersonModel',
        //                 proxy: {
        //                     type: 'ajax',
        //                     url : '/findDepAll?indexStr='+v,
        //                     method : 'GET',
        //                     reader: {
        //                         type: 'json',
        //                         rootProperty: 'users'
        //                     }
        //                 },
        //                 autoLoad: true
        //             });
        //             var usersStore = Ext.data.StoreManager.lookup('usersStoreId');
        //             usersStore.setData(depUserStore.getData());
        //         },
        //     }
        // },
        '->',{
            text: '添加用户',
            iconCls: 'fa fa-user-plus',
            handler: 'addUser'
        }],
        columns: [
            //{xtype: 'gridcolumn',width: 40,dataIndex: 'id',text: 'id'},
            {xtype: 'gridcolumn', cls: 'content-column',dataIndex: 'workNum',text: '工号',flex: 1},
            {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'name',text: '姓名',flex: 1},
            {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'gender',text: '性别'},
            {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'identity',text: '身份证',flex: 1},
            {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'userType',text: '职位',flex: 1},
            {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'hireDate',text: '入职日期',flex: 1,
            	renderer:Ext.util.Format.dateRenderer('Y/m/d')
        	},
            {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'iconUrl',text: '头像',flex: 1,
                renderer: function(value) {
                    return "<img src='resources/usersIcon/" + value + "' alt='user Pic' height='40px' width='40px'>";
                },sortable:false,
            },
            {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'userStatus',text: '状态',flex: 1,
	            renderer: function(val) {
	            	var color = 'black';
		            if (val =='正常的') {
		            	color = 'green';
			        } else if (val =='冻结的') {
		            	color = 'blue';
			        } else if (val =='被解雇的') {
		            	color = 'red';
			        }
			        return "<span style='color:"+color+";'>"+val+"</span>";
	            }
	        },
            {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'depName',text: '所属部门',flex: 1,sortable:false,},
            {xtype: 'actioncolumn',cls: 'content-column', width: 120,dataIndex: 'bool',text: '操作',
                defaults:{
                },
                items: [
                    '-',{xtype: 'button', iconCls: 'x-fa fa-pencil' ,handler: 'edit',tooltip: '编辑'},'-',
                    {xtype: 'button',iconCls: 'x-fa fa-rotate-left' ,handler: 'resetPassword',tooltip: '重置密码'},'-',
                    {xtype: 'button',iconCls: 'x-fa fa-snowflake-o' ,handler: 'frozen',tooltip: '冻结/解冻'},'-',
                ]
            }
        ],
        dockedItems: [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            itemId: 'userPaginationToolbar',
            displayInfo: true,
            bind: '{allUsers}'
        }]
    }],
});
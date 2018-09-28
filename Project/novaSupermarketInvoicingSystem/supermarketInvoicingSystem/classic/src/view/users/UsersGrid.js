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
            xtype: 'gridpanel',
            title: '管理用户信息',
            bind: '{allUsers}',
            scrollable: true,
            columns: [
                //{xtype: 'gridcolumn',width: 40,dataIndex: 'id',text: 'id'},
                // {xtype: 'gridcolumn',width: 75,dataIndex: 'profile_pic',text: 'User',
                //     renderer: function(value) {
                //         return "<img src='resources/usersIcon/defaultUser.jpg" + value + "' alt='Profile Pic' height='40px' width='40px'>";
                //     }
                // },
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
                        return "<img src='" + value + "' alt='user Pic' height='40px' width='40px'>";
                    }
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
                {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'depName',text: '所属部门',flex: 1},
                {xtype: 'actioncolumn',cls: 'content-column', width: 120,dataIndex: 'bool',text: 'Actions',tooltip: 'edit ',
                    items: [
                        {xtype: 'button', iconCls: 'x-fa fa-pencil' ,handler: ''},
                        {xtype: 'button',iconCls: 'x-fa fa-close'	,handler: ''},
                        {xtype: 'button',iconCls: 'x-fa fa-ban'	 	,handler: ''}
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
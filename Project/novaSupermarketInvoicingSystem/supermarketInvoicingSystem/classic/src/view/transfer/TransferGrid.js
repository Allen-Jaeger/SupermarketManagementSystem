Ext.define('SupermarketInvoicingSystem.view.transfer.TransferGrid', {
    extend: 'Ext.grid.Panel',
	xtype:'transferGrid',
	title: '调货工作流查看',		//需要修改
	iconCls: 'fa-arrow-circle-o-up',
	bind: '{transferStore}',//调用组件4
	columns: [{
			xtype: 'actioncolumn',
			items: [{
				xtype: 'button',
				iconCls: 'x-fa fa-pencil',
				tooltip: '签收任务',
				getClass: function(v, meta, rec) {
		            if (rec.get('assignee')!='') {
		                  return 'x-hidden';
		            }
		            return 'x-fa fa-pencil';
				},
				handler: 'onClickTransferClaimButton'	//ajax  taskId
			},{
				xtype: 'button',
				iconCls: 'x-fa fa-edit',
				tooltip: '审批任务',
				getClass: function(v, meta, rec) {
		            if (rec.get('assignee')=='') {
		                  return 'x-hidden';
		            }
		            return 'x-fa fa-edit';
				},
				handler: 'onClickTransferCompleteWindowButton'	//taskDefinitionKey 动态表单
			},{
				xtype: 'button',
				iconCls: 'x-fa fa-object-group',
				tooltip: '任务跟踪',
				handler: 'onClickTransferGraphTraceButton'	//流程跟踪
			}],
			cls: 'content-column',
			width: 120,
			dataIndex: 'bool',
			text: 'Actions',
			tooltip: 'edit '
		}
		,{header: 'id' 			,dataIndex: 'id',width: 60,sortable: true	,hidden:true}
		,{header: 'processStatus',dataIndex: 'processStatus',width: 60,sortable: true,
            renderer: function(val) {
	            if (val =='NEW') {
		            return '<span style="color:green;">新建</span>';
		        } else if (val =='APPROVAL') {
		            return '<span style="color:blue;">审批中...</span>';
		        } else if (val =='COMPLETE') {
		            return '<span style="color:orange;">完成审批</span>';
		        }else{
		        	return '<span style="color:red;">取消申请</span>';
		        }
		        return val;
            }
		} 
		//以下需要修改
		// ,{header: 'userId'  		,dataIndex: 'userId',width: 60,sortable: true}
		// ,{header: 'startTime' 	,dataIndex: 'startTime',width: 150,sortable: true,renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s')}
		// ,{header: 'endTime' 			,dataIndex: 'endTime',width: 150,sortable: true,renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s')}
		// ,{header: 'realityStartTime' 	,dataIndex: 'realityStartTime',width: 150,sortable: true,renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s')}
		// ,{header: 'realityEndTime' 	,dataIndex: 'realityEndTime',width: 150,sortable: true,renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s')}
		// ,{header: 'applyTime' 	,dataIndex: 'applyTime',width: 150,sortable: true,renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s')}
		// ,{header: 'leaveType'  	,dataIndex: 'leaveType',width: 80,sortable: true,
        //     renderer: function(val) {
	    //         if (val =='A') {
		//             return '<span style="color:green;">带薪假期</span>';
		//         } else if (val =='B') {
		//             return '<span style="color:red;">无薪假期</span>';
		//         } else if (val =='C') {
		//             return '<span style="color:blue;">病假</span>';
		//         }
		//         return val;
        //     }
        // }
		// ,{header: 'reason' 		,dataIndex: 'reason',width: 80,sortable: true}
		//以上需要修改

		,{header: 'processInstanceId' ,dataIndex: 'processInstanceId',width: 80,sortable: true}
		,{header: 'taskId'  		,dataIndex: 'taskId',width: 80,sortable: true}
		,{header: 'taskName'  		,dataIndex: 'taskName',width: 80,sortable: true}
		,{header: 'taskCreateTime'  ,dataIndex: 'taskCreateTime',width: 150,sortable: true,renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s')}
		,{header: 'assignee'  		,dataIndex: 'assignee',width: 80,sortable: true}
		,{header: 'taskDefinitionKey',dataIndex: 'taskDefinitionKey',width: 80,sortable: true}
		,{header: 'processDefinitionId'	,dataIndex: 'processDefinitionId',width: 80,sortable: true}
		,{header: 'suspended'  		,dataIndex: 'suspended',width: 80,sortable: true}
		,{header: 'version'  		,dataIndex: 'version',width: 60,sortable: true}
	]
	// ,
	// dockedItems: [{
	//     xtype: 'pagingtoolbar',
	//     dock: 'bottom',
	// 	bind: '{transferStore}',	//调用组件4
	//     displayInfo: true,
	//     items: ['-',{
    //         text: 'Add',
    //         iconCls: 'x-fa fa-plus',
	// 		listeners: {
	// 			click: 'onClickTransferGridAddButton'
    //         }
    //     }, '-',{
    //         text: 'Update',
    //         iconCls: 'x-fa fa-pencil',
    //         listeners: {
	// 			click: 'onClickTransferGridUpdateButton'
    //         }
    //     }, '-', {
    //         text: 'Delete',
    //         iconCls: 'x-fa fa-close',
	// 		listeners: {
	// 			click: 'onClickTransferGridDeleteButton'
    //         }
    //     }]
	// }]
});

Ext.define('SupermarketInvoicingSystem.view.process.definition.ProcessDefinitionGridPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'processDefinitionGridPanel',
    requires: [
        'Ext.grid.Panel'
        ,'Ext.toolbar.Paging'
        //,'Ext.grid.column.Date'
    ],
    layout: 'fit',
    items: [{
            xtype: 'gridpanel',
            cls: 'process-definition-grid',
            title: '流程定义列表',
            bind: '{processDefinitionLists}',
            scrollable: false,
            columns : [
				 {header : '流程定义实体Id',dataIndex : 'id',width : 120,sortable : true}
				,{header : '类别',dataIndex : 'category',width : 200,sortable : true}
				,{header : '名称',dataIndex : 'name',width : 100,sortable : true}
				,{header : '流程key',dataIndex : 'key',width : 80,sortable : true}
				,{header : '版本号',dataIndex : 'version',width : 60,sortable : true}
				,{header : '部署Id',dataIndex : 'deploymentId',width : 60,sortable : true,hidden : true}
				//,{header : '部署时间',dataIndex : 'deploymentTime',width : 150,sortable : true,renderer : Ext.util.Format.dateRenderer('Y/m/d H:i:s')}
				,{header : 'bpmn XML',dataIndex : 'resourceName',width : 120,sortable : true,hidden : true,
					renderer : function(value, metaData, record, rowIdx, colIdx, store, view) {
						return '<a target="_blank" href="'
								+ 'process-definition/resource?pdid='
								+ record.get('id') + '&resourceName='
								+ record.get('resourceName') + '">'
								+ record.get('resourceName') + '</a>';
					}
				}
				,{header : '流程图',dataIndex : 'diagramResourceName',width : 120,sortable : true,hidden : true,
					renderer : function(value, metaData, record, rowIdx, colIdx,store, view) {
						return '<a target="_blank" href="'
								+ 'process-definition/resource?pdid='
								+ record.get('id') + '&resourceName='
								+ record.get('diagramResourceName') + '">'
								+ record.get('diagramResourceName') + '</a>';
					}
				}
				,{header : '是否挂起',dataIndex : 'suspended',width : 80,	sortable : true,hidden : true}
				,{header : 'startFormKey',dataIndex : 'startFormKey',width : 180,sortable : true,hidden : true} 
				,{header : 'graphicalNotation',dataIndex : 'graphicalNotation',width : 180,sortable : true,hidden : true} 
				,{header : 'description',dataIndex : 'description',width : 60,sortable : true,hidden : true	}
				,{header : 'tenantId',dataIndex : 'tenantId',width : 180,sortable : true,hidden : true	}
				,{xtype : 'actioncolumn',cls : 'content-column',width : 260,text : '操作',
					items : [{
						xtype : 'button',iconCls : 'x-fa fa-trash-o',tooltip: '删除',
						handler : 'onClickProcessDefinitionGridDeleteButton'
					}, {
						xtype : 'button',iconCls : 'x-fa  fa-file-excel-o',tooltip: 'BPMN XML',
						handler : 'onClickProcessDefinitionReadResourceButton'
					} ,{
						xtype: 'button',iconCls: 'x-fa fa-file-picture-o',tooltip: '流程定义图',
						handler: 'onClickProcessDefinitionReadDiagramResourceButton'
					},{
		                xtype: 'button',iconCls: 'x-fa fa-cog',tooltip: '激活',
		                getClass: function(v, meta, rec) {
		                    if (rec.get('suspended') !=true) {
		                        return 'x-hidden';
		                    }
		                    return 'x-fa fa-cog';
		                },
		                handler: 'onClickProcessDefinitionActiveButton'
					}
					//,{
		            //     xtype: 'button',iconCls: 'x-fa fa-ban',tooltip: '挂起',
		            //     getClass: function(v, meta, rec) {
		            //         if (rec.get('suspended')!=false) {
		            //             return 'x-hidden';
		            //         }
		            //         return 'x-fa fa-ban';
		            //     },
		            //     handler: 'onClickProcessDefinitionSuspendButton'
		            // },{
					// 	xtype : 'button',
					// 	iconCls : 'x-fa fa-exchange',
					// 	tooltip: '转换为Model',
					// 	handler : 'onClickProcessDefinitionGridConvertModelButton'
					// }
				]
				}
			],
			tbar: [{
		        text: '上传BPMN',
		        tooltip: '上传流程图',
		        iconCls:'fa fa-cloud-upload',
		        handler: 'onClickProcessDefinitionGridUploadButton'	
		    }],	
            dockedItems: [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                displayInfo: true,
                bind: '{processDefinitionLists}'
            }]
        }]
});

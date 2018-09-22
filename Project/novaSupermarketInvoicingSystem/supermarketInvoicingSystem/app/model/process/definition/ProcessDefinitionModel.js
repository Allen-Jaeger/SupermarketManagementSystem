Ext.define('SupermarketInvoicingSystem.model.process.definition.ProcessDefinitionModel', {
    extend: 'SupermarketInvoicingSystem.model.Base',
 	fields: [
    	 {type: 'string' ,name: 'id'}
        ,{type: 'string' ,name: 'category'}
        ,{type: 'string' ,name: 'name'}
		,{type: 'string' ,name: 'key'}
        ,{type: 'string' ,name: 'description'}
		,{type: 'int'	 ,name: 'version'}
        ,{type: 'string' ,name: 'resourceName'}
        ,{type: 'string' ,name: 'deploymentId'}
		//,{type: 'date'   ,name: 'deploymentTime'}
		,{type: 'string' ,name: 'diagramResourceName'}
        ,{type: 'string' ,name: 'tenantId'}		
        ,{type: 'boolean',name: 'startFormKey'}
		,{type: 'boolean',name: 'graphicalNotation'}
        ,{type: 'boolean',name: 'suspended'}
    ]
});

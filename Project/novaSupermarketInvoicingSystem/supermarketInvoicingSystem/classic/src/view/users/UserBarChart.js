var userBarChartStore = Ext.create('Ext.data.Store', {
    fields: ['name', 'data1','data2'],
    data: [
        {name: '管理员',data1: 14,data2: 20},
        {name: '采购员',data1: 16,data2: 20}, 
        {name: '门店长',data1: 14,data2: 20}, 
        {name: '销售员',data1: 16,data2: 20}, 
		{name: '仓库员工',data1: 36,data2: 16}
    ],
    proxy: {
        type: 'ajax',
        method: 'GET',
        url: '/getEnum?enumName=UserType',
        reader: {
            type: 'json',
        }
        
    },
    autoLoad: true
});


Ext.define('SupermarketInvoicingSystem.view.users.UserBarChart', {
    extend: 'Ext.Panel',
    xtype: 'userBarChart',
    items: [{
        xtype: 'cartesian',
        captions: {
            title: '用户状态比例'
        },
        width: 400,
        height: 400,
        theme: 'green',
        store: userBarChartStore,
        animation:true,
        axes: [{//轴
            type: 'radial',
            grid: true,
            position: 'bottom',
            title: {
               text: '人数',
               fontSize: 15
           },
           fields:['data1','data2']
        }, {
           type: 'category',
           position: 'left',
           title: {
               text: '职位',
               fontSize: 15
           },
           grid: true,
           fields: 'name'
        }],
        flipXY: true,
        series: [{
           type: 'bar',
           highlight: true,
           animation:{
                duration: 1000,
                easing: 'easeIn',
           },
           xField: 'name',
           yField: ['data1','data2'],
        }],
        
    }],
});


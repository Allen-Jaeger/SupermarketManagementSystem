var pieStore = Ext.create('Ext.data.Store', {
    fields: ['name', 'data1'],
    data: [
        {name: 'metric one',data1: 14},
        {name: 'metric two',data1: 16}, 
        {name: 'metric three',data1: 14}, 
        {name: 'metric four',data1: 6}, 
        {name: 'metric five',data1: 36}
    ],
    proxy: {
        type: 'ajax',
        url: '/getEnum?enumName=UserType',
        reader: {
            type: 'json',
        },
        method: 'GET',
    },
    autoLoad: true
});

Ext.define('SupermarketInvoicingSystem.view.commodity.PieDonut', {
    extend: 'Ext.Panel',
    xtype: 'pieDonut',

    items: [{
        xtype: 'polar',
        innerPadding: 20,
        captions: {
            title: '用户状态比例'
        },
        width: 400,
        height: 400,
        theme: 'green',
        store: pieStore,
        series: [{
           type: 'pie',
           title:'TT',
           highlight: true,
           angleField: 'data1',
           label: {
               field:'name',
               display: 'rotate',
               renderer:function(text, sprite, config, rendererData, index){
                    var ag = this.getAngleField();
                    //console.log(ag);
                    var res = rendererData.store.getAt(index).data;
                    return text+":"+ag;
                }
            },
            donut: 80,
        },{
            radiusFactor:50,
            type: 'pie',
            title:'TT',
            highlight: true,
            angleField: 'data1',
            label: {
                field:'name',
                display: 'rotate',
                renderer:function(text, sprite, config, rendererData, index){
                    var ag = this.getAngleField();
                    //console.log(ag);
                    var res = rendererData.store.getAt(index).data;
                    return text+"\n"+ag;
                }
            },
            donut: 10,
        }],
        
    }],
});


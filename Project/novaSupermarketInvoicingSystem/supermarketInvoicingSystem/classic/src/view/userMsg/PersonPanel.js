Ext.define('SupermarketInvoicingSystem.view.userMsg.PersonPanel', {
    extend: 'Ext.form.Panel',
    xtype: 'personPanel',
    requires: [
        'Ext.layout.container.Anchor',
        'Ext.layout.container.Accordion',
        'Ext.Glyph',
        'Ext.layout.container.Column'
    ],
    scrollable: false,
    layout: 'fit',
    layout: 'column',
    items: [
        {
            margin: '50 0 20 100',
            defaults: {
                margin:'10',
            },
            items:[{
                anchor: '100% 50%',
                xtype: 'box',
                name: 'iconUrl',
                id: 'iconId',
                autoEl: {
                    width: 100,
                    height: 100,
                    tag: 'img',   
                    type: 'image',   
                    //src: '../../../../../resources/usersIcon/defaultUser.jpg',
                },
            },{
                anchor: '100% 50%',
                xtype: 'box',
                name: 'newIcon',
                id: 'newIconId',
                autoEl: {
                    width: 100,
                    height: 100,
                    tag: 'img',   
                    type: 'image',   
                    //src: '../../../../../resources/usersIcon/defaultUser.jpg',
                },
            },{
                xtype: 'filefield',
                //fieldLabel: '新头像',
                labelWidth: 50,
                id: 'imgFile',
                msgTarget: 'side',
                allowBlank: true,
                anchor: '100% 50%',
                buttonText: '预览上传图片',
                accept: 'image/*',
                readOnly: false,
                width: 250,
                listeners:{ //监听预览 浏览器保护
                    change:function(file){
                        var newImg= Ext.getCmp("imgFile").inputEl.component.fileInputEl.dom.files[0];//新图片
                        //console.log(newImg);
                        Ext.getCmp("newIconId").getEl().dom.src = window.URL.createObjectURL(newImg);
                    }
                }
            },],
        },{
            border:false,
            width: 600,
            margin: '20 50',
            layout: 'column',
            readOnlyCls: 'color: green;',
            defaults: {
                xtype: 'textfield',
                margin: '10',
                maxHeight: '30',
                maxWidth: '300',
                labelAlign: 'right',
                readOnly: true,
            },
            items: [{
                fieldLabel: 'Id',
                name: 'id',
            },{
                fieldLabel: '工号',
                name: 'workNum'
            },{
                fieldLabel: '密码',
                name: 'password'
            },{
                fieldLabel: '姓名',
                name: 'name'
            },{
                fieldLabel: '性别',
                name: 'gender'
            },{
                fieldLabel: '身份证',
                name: 'identity'
            },{
                fieldLabel: '用户类型',
                name: 'userType'
            },{
                fieldLabel: '权限',
                name: 'privileges'
            },{
                fieldLabel: '入职日期',
                id:'hireDateId'
            },{
                fieldLabel: '用户状态',
                name: 'userStatus'
            },{
                fieldLabel: '所属部门',
                name: 'depName'
            }],
        }],
    listeners:{
        afterRender: function(view) {
            var recordStore = Ext.data.StoreManager.lookup('personStoreId');
            recordStore.load();
            recordStore.on("load", function() {  
                var myInfo = recordStore.getAt(0).data.content[0];
                var Record = recordStore.recordType;
                var r = new Ext.data.Model(myInfo); //转成Record
                recordStore.insert(1, r);
                console.log(recordStore);
                view.getForm().loadRecord(recordStore.getAt(1));
                Ext.getCmp('iconId').getEl().dom.src = '../../../../../' + myInfo.iconUrl;
                Ext.getCmp('hireDateId').inputEl.dom.value = Ext.Date.format(new Date(myInfo.hireDate), 'Y年m月d日');
            });
        }
    },
});
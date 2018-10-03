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
    //layout: 'fit',
    layout: 'column',
    items: [
        {
            margin: '0 0 0 80',    
            items:[{
                xtype: 'form',
                title: '上传头像',                
                border: 1,
                items:[
                {
                    margin:'10 10 0 20',
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
                    margin: '10 10 0 20',
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
                    margin: '10 40 0 20',
                    xtype: 'filefield',
                    //fieldLabel: '新头像',
                    labelWidth: 50,
                    id: 'imgFile',
                    name: 'imgFile',
                    msgTarget: 'side',
                    allowBlank: true,
                    anchor: '100% 50%',
                    buttonText: '预览上传图片',
                    accept: 'image/*',
                    readOnly: false,
                    width: 230,
                    listeners:{ //监听预览 浏览器保护
                        change:function(file){
                            var newImg= Ext.getCmp("imgFile").inputEl.component.fileInputEl.dom.files[0];//新图片
                            //console.log(newImg);
                            if (null == newImg) {
                                Ext.getCmp('uploadButton').setDisabled(true);
                            }else{
                                Ext.getCmp("newIconId").getEl().dom.src = window.URL.createObjectURL(newImg);
                                Ext.getCmp('uploadButton').setDisabled(false);
                            }
                        }
                    }
                },{
                    xtype: 'button',
                    id: 'uploadButton',
                    text: '开始上传',
                    margin: '10 0 20 20',
                    padding: '10',
                    disabled: true,
                    handler:'uploadIcon',
                }],
            },{
                margin:'20 0 0 0',
                anchor: '100% 50%',
                xtype: 'form',
                title: '修改密码',
                allowBlank: true,
                border: 1,
                maskOnDisable: true,
                //anchor: '100% 50%',
                defaults:{
                    margin: '5 15 0 0',
                    labelAlign: 'right',
                    anchor: '100% 50%',
                },
                items:[
                    {
                        margin: '15 15 0 0',
                        xtype: 'textfield',
                        fieldLabel: '旧密码',
                        id: 'pass',
                    },{
                        xtype: 'textfield',
                        fieldLabel: '新密码',
                        id: 'newPass',
                        inputType:'password',
                    },{
                        xtype: 'textfield',
                        fieldLabel: '确认新密码',
                        inputType:'password',
                        id:'confirm',
                        listeners:{
                            change:function(){
                                var first = Ext.getCmp('newPass').value;
                                var second = this.value;
                                if (first == second) {
                                    Ext.getCmp('passwordTip').setHtml("<p style = 'color:green;'>新密码已两次确认</p>");
                                    Ext.getCmp('passButton').setDisabled(false);
                                    //console.log(Ext.getCmp('passwordTip').config);
                                }else{
                                    Ext.getCmp('passButton').setDisabled(true);
                                    Ext.getCmp('passwordTip').setHtml("<p style = 'color:red;'>新密码两次输入有误</p>");
                                }
                            }
                        },
                    },{
                        layout: 'column',
                        items:[{
                            xtype: 'button',
                            id: 'passButton',
                            text: '确认修改',
                            margin: '10 0 30 30',
                            padding: '10',
                            disabled: true,
                            handler:'changePassword',
                        },{
                            html: "",
                            id: 'passwordTip',
                            //margin: '',
                            padding: '10',
                        }],
                    }
                ],
            }
            ],
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
            items: [
            // {
            //     fieldLabel: 'Id',
            //     name: 'id',
            // },
            {
                fieldLabel: '工号',
                name: 'workNum'
            },
            // {
            //     fieldLabel: '密码',
            //     name: 'password'
            // },
            {
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
                Ext.getCmp('iconId').getEl().dom.src = '../../../../../resources/usersIcon/' + myInfo.iconUrl;
                Ext.getCmp('hireDateId').inputEl.dom.value = Ext.Date.format(new Date(myInfo.hireDate), 'Y年m月d日');
            });
        }
    },
});
Ext.define('SupermarketInvoicingSystem.model.userMsg.PersonModel', {
    extend: 'SupermarketInvoicingSystem.model.Base',
 	fields: [
    	 {type: 'auto' ,name: 'id'}
        ,{type: 'string' ,name: 'workNum'}
        ,{type: 'string' ,name: 'password'}
        ,{type: 'string' ,name: 'name'}
		,{type: 'string' ,name: 'gender'}
        ,{type: 'string' ,name: 'identity'}
        ,{type: 'auto'   ,name: 'userType'}
        ,{type: 'string'   ,name: 'privileges'}
        ,{type: 'date' ,name: 'hireDate'}
        ,{type: 'string' ,name: 'iconUrl'}
        ,{type: 'auto' ,name: 'userStatus'}		
        ,{type: 'string',name: 'depName'}
    ]
});
/**
    后台定义：
    private Long id; // 数据库管理id
    private String workNum; // 工号，用于登陆
    private String password = "123456"; // 初始密码
    private String name; // 真实姓名
    private String gender; // 性别
    private String identity; // 身份证
    private String userType; // 用户类型
    private String privileges; // 可用权限  使用 权限1，权限2，……的方式
    private Date hireDate; // 员工聘请日期
    private String iconUrl; // 头像
    private String userStatus; // 用户状态
    private String depName; //部门名字
*/
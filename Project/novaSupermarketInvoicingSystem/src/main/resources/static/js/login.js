$(document).ready(function(){
	$(".sbm").click(function(){
		document.getElementById("eMsg").innerHTML = 
				'<i style = "color: #5D9D5D; font-size: 20px;" class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>&nbsp;<span style = "color: #5D9D5D;">Login...</span>';
		var num = document.getElementById('workNum').value;
		var password = document.getElementById('password').value;
		//console.log(num + password);
		if (num == '' || password == '' || num == undefined || password == undefined) {
			document.getElementById('eMsg').innerHTML = "用户名或密码为空";
			return 0;
		}else{
			//document.getElementById('eMsg').innerHTML = "执行Ajax";
			//使用JQ
			$.ajax({
				url:"/login",
				method: 'POST',
				data:{
					workNum: num,
					password: password,
				},
				success:function(result){
					document.getElementById('eMsg').innerHTML = result;
					if(result == '登陆成功'){
						location.replace("http://localhost:8080/");
					}
				}
			});
		}
	});
});
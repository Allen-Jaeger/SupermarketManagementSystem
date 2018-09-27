function activeLogin(){
	$(document).ready(function(){
		$('#eMsg').text("");
		$(".sbm").removeAttr("disabled");  
		$(".sbm").attr({
			"style": "filter:grayscale(0); cursor: pointer;",
		});
		$(".slider").hide("slow");
		$(".verScc").show("slow");
	});
}
$(document).ready(function(){
		//设置登陆不可用
	$(".sbm").attr({
		"disabled":"true",
		"style": "filter:grayscale(1); cursor:url('image/ban.ico'),auto;",
	});

	$(".verSpan").css({'left': (Math.random()*140+50)});

	//拖拽设置
	$('#moveBar').mousedown( 	//可以拖拽的位置 鼠标点击
		function (event) { 
			var isMove = true;
			//获取鼠标点击位置
			var x = $(this).offset().left;
			//var abs_x = event.pageX - $('.moveBar').offset().left; 
			//var abs_y = event.pageY - $('.moveBar').offset().top; 
			$(document).mousemove(function (event) { //鼠标移动
				if (isMove) { 
					//console.log(event.pageX-x);
					var obj = $('#moveBar'); //移动者
					if(event.pageX-x < 17){
						obj.css({'left':0});
					}else if (event.pageX-x > 217) {
						obj.css({'left': 197})
					}else{
						obj.css({'left': event.pageX-x-20});
					}
					//obj.css({'left':event.pageX}); //, 'top':event.pageY - abs_y
				} 
			}).mouseup(function () { 	//左键松开
				if (isMove) {
					//判断位置 
					var distance = $('#moveBar').offset().left - $(".verSpan").offset().left;
					if (distance > -2 && distance < 6) {
						//成功
						activeLogin();
					}else{
						$('#eMsg').text("滑动验证失败，请重新操作");
						$(".verSpan").css({'left': (Math.random()*140+50)});
						$('#moveBar').css({'left': 0});
					}
				}
				isMove = false; 
			}); 
		});

	$('#sbm').click(function(event){
		event.preventDefault();
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




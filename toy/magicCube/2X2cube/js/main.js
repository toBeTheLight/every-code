'use strict'
let elWrap = document.getElementsByClassName('wrap')[0];
//wrap位置修正
function elWrapPosition() {
	elWrap.style.transitionDuration = '0s';
	console.log(elWrap.style.transitionDuration)
	let elWrapLeft = document.body.clientWidth / 2 - 100,
	elWrapTop = document.body.clientHeight / 2 - 100,
	elWrapPositionText = 'left:' + elWrapLeft + 'px;top:' + elWrapTop + 'px';
//	elWrap.setAttribute('style', elWrapPositionText);
	elWrap.style.left = elWrapLeft + 'px';
	elWrap.style.top = elWrapTop + 'px';
}
window.addEventListener('resize', elWrapPosition, false)
elWrapPosition();

//改用键盘事件，固定角度旋转
let rotateWrap = (ev)=>{
	//恢复transition效果
	elWrap.style.transition = 'all 0.3s';
	let e = ev || event;
	let x = 0,y = 0,z = 0,temp = 0;
	switch (e.keyCode){
		case 87 :
		//按下w 上
		console.log('上');
		x = 90;
		break;
		case 83 :
		//按下s 下
		console.log('下');
		x = -90;
		break;
		case 65 :
		//按下a 左
		console.log('左');
		y = -90;
		break;
		case 68 :
		//按下d 右
		console.log('右');
		y = 90;
		break;
	}
	elWrap.transformTool();
//	根据已有角度/90并模4简化确定现方向
	let nX = (elWrap.transformTool('rotateX')/90)%4;
	nX = nX<0 ? nX+4 : nX;
	let nY = (elWrap.transformTool('rotateY')/90)%4;
	nY = nY<0 ? nY+4 : nY;
	let nZ = (elWrap.transformTool('rotateZ')/90)%4;
	nZ = nZ<0 ? nZ+4 : nZ;
	//根据nX交换变化量
	if(nX===1){
		temp = y;
		y = z;
		z =  -temp;
	}else if(nX===2){
		y = -y;
		z = -z;
	}else if(nX===3){
		temp = z;
		z = y;
		y = -temp;
	}
	//根据nY交换变化量
	if(nY===1){
		temp = z;
		z = x;
		x = -temp;
	}else if(nY===2){
		x = -x;
		z = -z;
	}else if(nY===3){
		temp = x;
		x = z;
		z = -temp;
	}
	//根据nZ交换变化量
	if(nZ===1){
		temp = x;
		x = y;
		y = -temp;
	}else if(nZ===2){
		x = -x;
		y = -y;
	}else if(nZ===3){
		temp = y;
		y = x;
		x = -temp;
	}

	elWrap.transformTool('rotateX',x + elWrap.transformTool('rotateX'));
	elWrap.transformTool('rotateY',y + elWrap.transformTool('rotateY'));
	elWrap.transformTool('rotateZ',z + elWrap.transformTool('rotateZ'));
}

window.addEventListener('keyup',rotateWrap,false);



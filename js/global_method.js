/**
公共函数方法
来自 light 
作者 light
*/
const serviceURL="https://jklz.jkluzhou.cn/healthy/api.do?";//地址
const dsHearder={'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'};
// const sempHearder= {'content-type': 'application/x-www-form-urlencoded'};
var openID="";
var openWatchId="";

var isShowLoading=false;

function log(logKey, e) {
	e = e || ''
	// #ifdef APP-PLUS
	console.log(logKey + '=>' + JSON.stringify(e))
	// #endif
	// #ifndef APP-PLUS
	console.log(logKey + '=>', e)
	// #endif
}


function ds_api(paramObj){	
	let postData={};
	if(!hqkFuncIsEmpty(paramObj.data)){		
		postData={...paramObj.data}
	}
	log(paramObj.loadmsg + '=>params',postData);
	console.log(serviceURL + paramObj.method);
	paramObj.showLoading = paramObj.showLoading == false ? false : true;
	
	if(!isShowLoading && paramObj.showLoading){
		uni.showLoading({
			title: "数据加载中...",
			mask: true
		});
		isShowLoading=true;
	}
	let promiseObj=new Promise((resolve,reject)=>{
		uni.request({
			url: serviceURL+ paramObj.method,
			header:dsHearder,
			method: 'POST',			
			data: postData,
			success: (res) => {
				if(isShowLoading){
					uni.hideLoading();
					isShowLoading=false;
				}			
				log(paramObj.loadmsg + '=>success', res);
				let errObj = {
					errMsg: paramObj.loadmsg + '=>'
				}			
				if (!res.data) {
					errObj.errMsg += '接口data为null';				
					paramObj.fail && paramObj.fail(errObj);
					paramObj.complete && paramObj.complete(errObj);	
					reject(errObj);
					return;
				}
				paramObj.success && paramObj.success(res);
				paramObj.complete && paramObj.complete(res);
				resolve(res);
			},
			fail:(err)=>{
				if(isShowLoading){
					uni.hideLoading();
					isShowLoading=false;
				}
				log(paramObj.loadmsg + '=>fail', err);
				paramObj.fail && paramObj.fail(err);
				paramObj.complete && paramObj.complete(res);
				reject(err);
			}
		});
	})
	return promiseObj.then((res) => {
		return [null, res];
	}).catch((err) => {
		return [err];
	});
}

function beforeNine(num){
	num=num>9?num:'0'+num;
	return num;
}
function checkLogin(hasLogin) {
	if (!hasLogin) {
		 uni.navigateTo({
			url:'/pages/appointment/login/login'
		 });
		
	}
	return hasLogin
}
function checkProvider(paramObj){
	log('checkProvider', paramObj);
	let promiseObj=new Promise((resolve,reject)=>{
		let errObj = {
			isError: true
		}
		let tempProvider = paramObj.provider;
		if (tempProvider == 'min_wxpay') {
			tempProvider = 'wxpay';
		}
		uni.getProvider({
			service:paramObj.service,
			success:(res)=>{
				let provider='';
				for (let i = 0; i < res.provider.length; i++) {
					if (res.provider[i] == tempProvider) {
						provider = tempProvider;
						break;
					}
				}
				if(provider!=''){
					errObj.isError = false;
					paramObj.success && paramObj.success(errObj);
					resolve(res);
					return
				}
				switch (tempProvider) {
					case 'weixin':
					case 'wxpay':
						errObj.errMsg = '微信服务未开启';
						break;
				
					case 'alipay':
						errObj.errMsg = '支付宝服务未开启';
						break;
				
					case 'apple':
						errObj.errMsg = '苹果服务未开启';
						break;
				
					default:
						errObj.errMsg = '暂不支持当前服务商[' + tempProvider + ']';
						break;
				}
				paramObj.fail && paramObj.fail(errObj);
				reject(errObj)
			},
			fail:(err)=>{
				errObj.errMsg = err.errMsg;
				paramObj.fail && paramObj.fail(errObj);
				reject(errObj)
			}
		})
		
	})
	return promiseObj.then((res) => {
		return [null, res];
	}).catch((err) => {
		return [err];
	});
}

async function ds_pay(paramObj){
	uni.showLoading({
		title:"发起支付..."
	})
	if (!paramObj.provider || paramObj.provider == '') {
		uni.hideLoading();
		showToast('参数[provider]为必填项');
		return
	}
	// #ifdef APP-PLUS || MP-WEIXIN
	let result = await checkProvider({
		service: 'payment',
		provider: paramObj.provider
	});
	if (result.length < 2) {
		uni.hideLoading();
		uni.showLoading({
			title:result[0].errMsg,
			icon:"none"
		})		
		return;
	}
	result = await ds_api({
		method: paramObj.method,
		showLoading: false,		
		data:paramObj.data
	});
	if (result.length < 2) {
		console.error(JSON.stringify(result));
		uni.hideLoading();
		uni.showToast({
			title:result[0].errMsg,
			icon:"none"
		})		
		return;
	}
	let orderInfo = result[1].data.data;
	
	result = await uni.requestPayment({
		provider: paramObj.provider,
		// #ifndef MP-WEIXIN
		orderInfo: orderInfo,
		// #endif
		// #ifdef MP-WEIXIN
		timeStamp: orderInfo.timeStamp,
		nonceStr: orderInfo.nonceStr,
		package: orderInfo.package,
		signType: orderInfo.signType,
		paySign: orderInfo.paySign,
		// #endif
	});	
	if (result.length < 2) {
		console.error(JSON.stringify(result));		
		uni.hideLoading();	
		paramObj.fail && paramObj.fail(result[0]);
		return;
	}
	uni.hideLoading();
	paramObj.success && paramObj.success(result[1]);
	// #endif
	
}


function getAge(UUserCard){
	let myDate = new Date();
	let month = myDate.getMonth() + 1;
	let day = myDate.getDate();
	let age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1;
	if (UUserCard.substring(10, 12) < month || UUserCard.substring(10, 12) == month && UUserCard.substring(12, 14) <= day) {
		age++;
	}
	return age;
}
function getPageName() {
	let pages = getCurrentPages();
	let page = pages[pages.length - 1];
	let routeData = page.route.split('/');
	return routeData[routeData.length - 1];
}

function dateFmt(){
	let date=new date();
	let y=date.getFullYear();
	let m=beforeNine(date.getMonth()+1);
	let d=beforeNine(date.getDate());
	let h=beforeNine(date.getHours())
	let i=beforeNine(date.getMinutes())
	let s=beforeNine(date.getSeconds())
	return y+'-'+m+'-'+d+' '+h+':'+i+':'+s; 
}

/**********引用总工程函数----合并工程时有重复可以删掉****************/
function hqkFuncIsEmpty(obj){
		if(typeof obj == "undefined" || obj == null || obj == ""){
			return true;
		}else{
			return false;
		}
   };
   //begin从0开始，如hqkFuncStrEncrypt('123456',3,2,'*')返回为123**6
 function hqkFuncStrEncrypt( str, begin, len, estr){
   	let strlen = this.hqkFuncLength( str);
   	if( strlen<1 || strlen<=begin){
   		return '';
   	}
   	let estrtmp = '';
   	if( len==0) len = strlen - begin;
   	for( var n=0; n<len; n++){
   		estrtmp += estr;
   	}
   	return str.substr( 0, begin) + estrtmp + str.substr( begin+len);
   };
function hqkFuncLength( obj){
		if(typeof obj == "undefined" || obj == null){
			return -1;
		}
		if(typeof obj == "number"){
			return (obj+'').length;
		}
		if(typeof obj == "string"){
			return obj.trim().length;
		}else{
			return obj.length;
		}
	};
function hqkFuncToString(obj){
		if(typeof obj == "undefined" || obj == null || obj == ""){
			return '';
		}else{
			return String(obj);
		}
	};
	
function hqkFuncStartWith(str,b){
		let index = str.indexOf(b);
		if(index==0){
			return true;
		}else{
			return false;
		}
    };


function hqkFuncBuildBirthdayByCardid(idCard){
		var birthday = "";
		if(idCard != null && idCard != ""){
			if(idCard.length == 15){
				birthday = "19"+idCard.slice(6,12);
			} else if(idCard.length == 18){
				birthday = idCard.slice(6,14);
			}   
			birthday = birthday.replace(/(.{4})(.{2})/,"$1-$2-");
			//通过正则表达式来指定输出格式为:1990-01-01
		}   
		return birthday;
	};	
	
	function hqkFuncBuildSexByCardid(idCard){
		var sexStr = '';
		if (parseInt(idCard.slice(-2, -1)) % 2 == 1) {
			sexStr = 1;//男
		}
		else {
			sexStr = 2;//女
		}
		return sexStr;
	};
/**********引用总工程函数 ---end************************************/



export default {
	openID,
	openWatchId,
	//-------func---
	ds_api,
	beforeNine,
	checkLogin,
	getAge,
	hqkFuncIsEmpty,
	hqkFuncStrEncrypt,
	hqkFuncLength,
	hqkFuncToString,
	hqkFuncStartWith,
	hqkFuncBuildBirthdayByCardid,
	hqkFuncBuildSexByCardid,
	getPageName
	
}
/**
公共函数方法
来自 light 
作者 light
*/
const serviceURL="http://192.168.3.254:9900/bsoft-portal/web/bsoft/health-manage/famdoctorService/";//地址
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
	function yhdFuncSex(sexId){//性别字典
		let sexStr = '';
		switch(sexId){
			case '1':
				sexStr='男';
			break;
			case '2':
				sexStr='女';
			break;
			default:
				sexStr='未知';
		}
		return sexStr
	}
	function yhdFuncHometype(id){//常驻类型
		let str = '';
		switch(id){
			case '1':
				str='户籍';
			break;
			case '2':
				str='非户籍';
			break;
		}
		return str
	}
	function yhdFuncNation(nationId){//民族字典
		let nationStr = '';
		switch(nationId){
			case '01':
				nationStr='汉族';
			break;
			case '99':
				nationStr='少数民族';
			break;
		}
		return nationStr
	}
	function yhdFuncCultural(id){ //学历字典
		let str = '';
		switch(id){
			case '1':
				str='研究生';
			break;
			case '2':
				str='大学本科';
			break;
			case '3':
				str='大学专科和专科学校';
			break;
			case '4':
				str='中等专业学校';
			break;
			case '5':
				str='技工学校';
			break;
			case '6':
				str='高中';
			break;
			case '7':
				str='初中';
			break;
			case '8':
				str='小学';
			break;
			case '9':
				str='文盲或半文盲';
			break;
			case '10':
				str='不详';
			break;
		}
		return str
	}
	function yhdFuncCardType(id){
		let str = '';
		switch(id){
			case '01':
				str='居民身份证';
			break;
			case '02':
				str='居民户口簿';
			break;
			case '03':
				str='护照';
			break;
			case '04':
				str='军官证';
			break;
			case '05':
				str='驾驶证';
			break;
			case '06':
				str='港澳居民往来内地通行证';
			break;
			case '07':
				str='台湾居民往来内地通行证';
			break;
			case '99':
				str='其他法定有效证件';
			break;
			
		}
		return str
	}
	function yhdFuncOccupation(id){ //职业字典
		let str = '';
		switch(id){
			case '0':
				str='国家机关、党群组织、企业、事业单位负责人';
			break;
			case '1':
				str='专业技术人员';
			break;
			case '2':
				str='办事人员和有关人员';
			break;
			case '3':
				str='商业、服务业人员';
			break;
			case '4':
				str='农、林、牧、渔、水利业生产人员';
			break;
			case '5':
				str='生产、运输设备操作人员及有关人员';
			break;
			case '6':
				str='军人';
			break;
			case '7':
				str='不便分类的其他从业人员';
			break;
		}
		return str;
	}
	function yhdFuncMarriage(id){//婚姻字典
		let str = '';
		switch(id){
			case '1':
				str='未婚';
			break;
			case '2':
				str='已婚';
			break;
			case '3':
				str='丧偶';
			break;
			case '4':
				str='离婚';
			break;
			case '5':
				str='未说明的婚姻状况';
			break;
		}
		return str;
	}
	function yhdFuncPayType(id){//支付类型字典
		let str = '';
		switch(id){
			case '01':
				str='城镇职工基本医疗保险';
			break;
			case '02':
				str='城镇居民基本医疗保险';
			break;
			case '03':
				str='新型农村合作医疗';
			break;
			case '04':
				str='贫困救助';
			break;
			case '05':
				str='商业医疗保险';
			break;
			case '06':
				str='全公费';
			break;
			case '07':
				str='全自费';
			break;
			case '99':
				str='其他';
			break;
		}
		return str;
	}
	function arrSplicedh(obj){
		let str='';
		if(obj.length==0){
			str='';
		}else{
			str=obj.toString();
		}
		return str;
	}
	function arrSpliceDisease(obj){//既往史
		let arr=[];
		obj.map((item)=>{
			if(!item.pickerDis){
				if(item.hasOwnProperty('inputValue')){
					let str = item.type +'|' + item.inputValue +'|' + item.date
					arr.push(str);
				}else{
					let str = item.type +'|'  + item.date
					arr.push(str);
				}
			}
		})
		let result = arr.toString();
		return result;
	}
	function arrSpliceStr(obj,type){
		let result;
		if(type.indexOf("01")>-1){
			result='';
		}else{
			let arr=[];
			obj.map((item)=>{
				let str = item.inputValue +'|' + item.date
				arr.push(str);
			})
			 result = arr.toString();
		}
		return result;
	}
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
	getPageName,
	yhdFuncSex,
	yhdFuncHometype,
	yhdFuncNation,
	yhdFuncCultural,
	yhdFuncCardType,
	yhdFuncOccupation,
	yhdFuncMarriage,
	yhdFuncPayType,
	arrSplicedh,
	arrSpliceDisease,
	arrSpliceStr
}
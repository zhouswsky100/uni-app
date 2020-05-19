<template>
	<view>
		<view class="margin-sm bg-white padding-tb-sm radius-df">
			<view class="text-center padding-sm solid-bottom text-lg flex space-between ">
				<text>订单详情</text>
				<text>待缴费</text>
			</view>
			<view class="padding-sm flex-row" v-for="(item,index) in showInfo" :key="index">
				<view class="p-name">{{item.title}}</view>
				<view>{{item.value}}</view>
			</view>
			
		</view>
		<view class="padding flex flex-direction">
			
			<button class="cu-btn bg-base margin-tb-sm lg text-white" @click="submit">确认支付</button>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		data(){
			return {				
				showInfo:{
					orderSerial:{
						title:"订单号码",
						value:""
					},
					pname:{
						title:"就诊人",
						value:""
					},
					oname: {
						title:"就诊医院",
						value:""
					},
					dname: {
						title:"就诊科室",
						value:""
					},
					ename:{
						title:"就诊医院",
						value:""
					},
					eType:{
						title:"费用类型",
						value:"挂号费"
					},
					price:{
						title:"费用",
						value:""
					},
					time:{
						title:"就诊时间",
						value:""
					},
					orderDay:{
						title:"就诊日期",
						value:""
					}
					
				},
				payType:"",
				orderReturn:{},
				orderInfo:{},
				urlParam:{},
				aumUuid:0
			}
		},
		onLoad(e){
			
			this.urlParam=JSON.parse(e.urlParam);
			console.log(this.urlParam)
			
			// #ifdef MP-WEIXIN
			this.payType = 'min_wxpay';
			// #endif
			// #ifdef APP-PLUS
			this.payType = 'wxpay';
			// #endif
			this.getData()
		},
		methods:{
			submit(){
					console.log("aum==========>"+this.aumUuid)
					this.$globalMethod.ds_api({
						method:"m=O007&token=SemXlsuV0Ko2Ugrp",
						loadmsg:"微信预支付",
						showLoading:false,
						data:{
							orgUuid:this.urlParam.requestParams.orgUuid,
							oname:this.showInfo.oname.value,
							payAmount:Number(this.urlParam.requestParams.price),
							pname:this.showInfo.pname.value,
							patientId:this.urlParam.sureInfo.patientId,
							cashAmount:Number(this.urlParam.requestParams.price),
							payTypeTag:"1",
							aumoUuid:'9332',
							orderSerial:this.urlParam.sureInfo.orderSerial,
							openId:"",
							userId:this.$status.userId(),
							
						},
						success:(res)=>{
							if(!res || res.data.data.length==0){
								return
							}
							let obj=res.data.data;
							
							uni.requestPayment({
							    provider:'wxpay',								
								noncestr: obj.nonceStr,
								package: obj.package,								
								signType: obj.signType,	
								paySign: obj.sign,
								timestamp:  obj.timeStamp,
							    success: (res)=>{
							        console.log('success:' + JSON.stringify(res));
							    },
							    fail:(err)=>{
							        console.log('fail:' + JSON.stringify(err));
							    }
							});
							
						}					
					})
				
				
		// 		let requestParams={
		// 			orgUuid:this.orderInfo.orgUuid,
		// 			orgDeptUuid:this.orderInfo.orgDeptUuid,
		// 			orgDeptEmpUuid:this.orderInfo.orgDeptEmpUuid,
		// 			scheduleUuid:this.orderInfo.scheduleUuid,
		// 			orderSerial:this.orderInfo.orderSerial,
		// 			orderResType:this.orderReturn.orderResType,
		// 			payAmount:this.orderReturn.price,					
		// 			payTime:this.$globalMethod.dateFmt(),
		// 			cashAmount:this.orderReturn.price,
		// 			insurAmount: "0",
		// 			couponAmount: "0",
		// 			appOrderId:this.orderReturn.appOrderId,
		// 			sdate://出诊时间
		// 			payDetailJSON:[
		// 				{
		// 					payType: "99",
		// 					payWayTag: 7,
		// 					paySerial: "123",
		// 					pname": "",
		// 					idcard: "",
		// 					insuranceCard: "",
		// 					insurPCSerial: "",
		// 					payAmount: price,
		// 					cashAmount: price,
		// 					insurAmount: "0",
		// 					insurPublicAmount: "0",
		// 					insurSelfAmount: "0",
		// 					couponAmount: "0",
		// 					payTime: "",
		// 					payJSON: ""
		// 				}
		// 			],
		// 			userId:this.$status.userId()
		// 			outTradeNo:
		
		// 		}
				
				// this.$globalMethod.ds_pay({
				// 	provider:this.payType,//支付平台-必填项
				// 	method:"m=O002&token=Sapp_id_01_13000&openId=" + this.$globalMethod.openID + "&publicOpenId=" + this.$globalMethod.openWatchId,
				// 	data:
				// })
			},
			getData(){
				for(let key in this.showInfo){
					if(key=="eType" || key=="orderSerial" || key=="time"){
						continue
					}
					this.showInfo[key].value=this.urlParam.urlShowParam[key];
				}
				this.showInfo.orderSerial.value=this.urlParam.sureInfo.orderSerial;
				let time=this.urlParam.requestParams.timeBegin+'-'+this.urlParam.requestParams.timeEnd;
				this.showInfo.time.value=time;
				
				this.$globalMethod.ds_api({
					method:"m=Y005&token=SemXlsuV0Ko2Ugrp&openId=" + this.$globalMethod.openID,
					loadmsg:"就诊人列表",
					showLoading:false,
					data:{
						userId:this.$status.userId()						
					},
					success:(res)=>{
						if(!res || res.data.data.length==0){
							return
						}
						let list=res.data.data;
						list.forEach((item)=>{
							
							if(item.pname==this.urlParam.urlShowParam.pname){
								this.aumUuid=item.aumUuid;
								
							}
							
						})
						
						
					}					
				})
				
				
				
			}
		},
		computed: {
			...mapState(['$status']),
			
		}
		
		
	}
</script>

<style>
	.p-name{
		width:200upx;
	}
</style>

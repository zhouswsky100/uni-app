<template>
	<view class="warp">		
		<view class="margin-sm bg-white padding-tb-sm radius-df">
			<view class="title flex space-between solid-bottom padding text-lg">
				<text>订单详情</text>
				<text class="text-grey">{{allInfo.statuName}}</text>
			</view>
			<view class="padding-sm flex-row" v-for="(item,index) in showOrderInfo" :key="index">
				<view class="p-name">{{item.title}}</view>
				<view>
					{{item.value}}
					<text v-if="item.status" class="status-title radius margin-left padding-xs" :class="{active:item.status==1}" @click="pay(item.status)">{{item.status==1?"待缴费":"已退号"}}</text>
				</view>
			</view>
		
			
		</view>
		<view class="padding flex flex-direction">
			
			<button class="cu-btn bg-base margin-tb-sm lg text-white" @click="deleteOrder">{{allInfo.status==1?"取消订单":"删除订单"}}</button>
		</view>
		
	</view>	
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		data() {
			return {				
								
				aumUuid:0,								
				showOrderInfo:{
					orderSerial:{
						title:"订单号码",
						value:""
					},
					pname:{
						title:"就诊人",
						value:""
					},
					oname:{
						title:"就诊医院",
						value:""
					},
					dname:{
						title:"就诊科室",
						value:""
					},
					ename:{
						title:"就诊医生",
						value:""
					},
					price:{
						title:"挂号费",
						value:"",
						status:"1"
					},
					applyTime:{
						title:"下单时间",
						value:""
					},
					sdate:{
						title:"就诊时间",
						value:""
					}
					
					
				},
				allInfo:{}
			}
		},
		onLoad(e){
	
			let orderInfo=JSON.parse(e.orderInfo);
			this.allInfo=orderInfo;
			console.log(orderInfo)
			for(let key in this.showOrderInfo){
				this.showOrderInfo[key].value=orderInfo[key]
				if(this.showOrderInfo[key].status){
					this.showOrderInfo[key].status=orderInfo.status
				}
			}
			
			
			// this.getData();
			//console.log(parseFloat("12.00元"))
			
		},
		methods:{
		
			input(e){
				this.medicalCard=e.detail.value;
			},
			patientInfo(e){
				uni.navigateTo({
					url: '/pages/appointment/card/insert-patient-card'
				});
			},
			pay(status){
				if(status!=1){
					return
				}
				let requestParams={					
					orgUuid: this.allInfo.orgUuid,
					orgDeptUuid: this.allInfo.orgDeptUuid,
					orgDeptEmpUuid: this.allInfo.orgDeptEmpUuid,
					scheduleUuid: this.allInfo.scheduleUuid,					
					orderResType: this.allInfo.orderResType,					
					timeBegin:this.allInfo.timeBegin,
					timeEnd: this.allInfo.timeEnd,
					payChargeType: "99",
					mobile: this.allInfo.mobile,
					price: parseFloat(this.allInfo.price)*100
				}
				let urlShowParam={
					dname:this.allInfo.dname,
					oname:this.allInfo.oname,
					pname:this.allInfo.pname,
					ename:this.allInfo.ename,
					price: this.allInfo.price,										
					orderDay:this.allInfo.sdate,	
				}
				let sureInfo={
				    orderSerial:this.allInfo.orderSerial,
					appOrderId:this.allInfo.appOrderId,
					visitNotice:this.allInfo.visitNotice,
					patientId:this.allInfo.patientId
				}
				let urlParam={
					requestParams,
					urlShowParam,
					sureInfo
				}	
				uni.navigateTo({
					url:"/pages/appointment/pay/pay?urlParam="+JSON.stringify(urlParam)
				})
			},
			deleteOrder(){
				uni.showModal({
					title: '确定要删除订单吗？',
					content: '删除后是不可恢复的',
					success: res => {
						if (res.confirm) {
							this.$globalMethod.ds_api({
								method: "m=O005&token=SemXlsuV0Ko2Ugrp&openId=" + this.$globalMethod.openID+"&publicOpenId="+this.$globalMethod.openWatchId,
								loadmsg:"删除订单",
								data: {
									userId: this.$status.userId(),
									appOrderId: this.allInfo.appOrderId
								},
								success: (res) => {
									uni.showToast({
										title:"删除成功",
										icon:"none"
									})
									this.$status.addRefreshNum("orderDetail")
									uni.navigateBack()
								}
							})
						}
					}
				});
			},
			getData(){				
				
			}
		
		},
		computed: {
			...mapState(['$status']),
		},
	}
</script>


<style lang="scss">
	.p-name{
		width:200upx;
	}
	.status-title{
		color:#fff;
		background: #bbb;
		&.active{
			background:#157BC7
		}
	}
</style>


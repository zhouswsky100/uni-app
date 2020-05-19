<template>
	<view class="warp">
		<view class="cu-list menu-avatar b-b bg-white">
			<view class="flex padding">
				<view class="cu-avatar round xl" :style="{'background-image':'url('+orderInfo.headImage+')'}"></view>
				<view class="content margin-left text-spec">
					<view>{{orderInfo.ename}} <text class="text-grey text-sm margin-left">{{orderInfo.deptName}}</text></view>
					<view class="text-gray">
						<view class="text-spec">							
							{{orderInfo.jobTitle}}
						</view>
						<view class="text-spec">
							{{orderInfo.oname}}
						</view>
					</view>
				</view>				
			</view>
		</view>
		<view class="order-detail-box padding bg-white">
			<view class="order-list text-df text-gray line-height">
				就诊日期：<text class="text-black margin-left-xs">{{orderInfo.orderDay}}</text>
			</view>
			<view class="order-list text-df text-gray line-height">
				就诊时间：<text class="text-black margin-left-xs">{{orderInfo.timeBegin+'-'+orderInfo.timeEnd}}</text>
			</view>
			<view class="order-list text-df text-gray line-height">
				挂号费用：<text class="text-black margin-left-xs">{{orderInfo.priceJSON.price}}元</text>
			</view>
			<view class="order-list text-df text-gray line-height">
				就诊地点：<text class="text-black margin-left-xs">{{orderInfo.addr}}</text>
			</view>
		</view>
		
		<view class="hospital-info-box margin-top-sm bg-white">
			
			<view class="padding-lr padding-tb-sm  flex space-between y-center" @click="patientClick">
				<view class="text-black text-df">选择就诊人</view>
				<view class="text-gray text-spec flex">
					<view class="text-right">
						<view>{{aumSeletedInfo.pname}}</view>
						<view>{{aumSeletedInfo.idcard}}</view>
					</view>
					<view class="cuIcon-right y-center margin-left-sm"></view>
				</view>
			</view>
			
			<view class="padding flex-row space-between b-t">
				<view class="text-df text-black">短信接收信号</view>
				<view class="text-df text-gray">{{aumSeletedInfo.mobile}}</text></view>
			</view>
		</view>
		<view class="hospital-info-box margin-top-sm bg-white">
			<view class="padding flex-row space-between">
				<view class="text-df text-black">电子健康卡</view>
				<view class="text-df text-gray">{{aumSeletedInfo.healthCardNo}}<text class="cuIcon-right margin-left-sm"></text></view>
			</view>
		</view>
		<view class="hospital-info-box margin-top-sm bg-white">
			<view class="padding flex-row  b-t">
				<view class="text-df text-black">缴费方式</view>
				<view class="text-df margin-left-xl">
					<text class="cuIcon-roundcheckfill color-base icon-size margin-right-xs"></text>在线支付
				</view>
			</view>
		</view>
		
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-base margin-tb-sm lg text-white" @click="submit">下一步</button>
		</view>				
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		data(){
			return {
				orderInfo:{},				
				aumList:[],
				refresh:0,
				aumSeletedInfo:{},
				uMenberId:0
			}
		},
		onLoad(e){
			this.orderInfo=JSON.parse(e.orderInfo);
			console.log(this.orderInfo);
			this.getData()
			// this.test()//测试用
			
		},
		onShow(){
			this.uMenberId=uni.getStorageSync('uMenberId');
			let refresh=this.$status.getRefreshNum(this.$globalMethod.getPageName())
			if(this.refresh==refresh){
				return
			}
			console.log(this.refresh+'====>'+refresh)
			this.refresh = refresh;	
			this.getUmender()
		},
		methods:{
			OrderClick(){
				uni.navigateTo({
					url:"/pages/appointment/order/orderDetail"
				})
			},
			patientClick(){				
				uni.navigateTo({
					url:"/pages/appointment/select-patient/select-patient"
				})
				
			},
			submit(){				
				let requestParams = {
				  aumUuid: this.aumSeletedInfo.aumUuid,
				  orgUuid: this.orderInfo.orgUuid,
				  orgDeptUuid: this.orderInfo.orgDeptUuid,
				  orgDeptEmpUuid: this.orderInfo.orgDeptEmpUuid,
				  scheduleUuid: this.orderInfo.scheduleUuid,
				  orderPoolUuid: this.orderInfo.orderPoolUuid,
				  orderResType: this.orderInfo.orderResType,
				  sdate: this.orderInfo.sdate,
				  timeBegin:this.orderInfo.timeBegin,
				  timeEnd: this.orderInfo.timeEnd,
				  payChargeType: "99",
				  mobile: this.aumSeletedInfo.mobile,
				  price: this.orderInfo.priceJSON.price+'00'
				};				
				
				uni.showModal({
					title:"温馨提示",
					content:"在互联网平台上注册只适用于自费用户。暂时不支持医疗保险费用减免。",
					success:(res)=>{
						if(res.confirm){
							this.$globalMethod.ds_api({
								method:"m=O001&token=Sapp_id_01_13000&openId=" + this.$globalMethod.openID + "&publicOpenId=" + this.$globalMethod.openWatchId,
								loadmsg:"预约下单",					
								data:requestParams,
								success:(res)=>{
									if(!res || !res.data.data){
										return
									}									
									let list=res.data.data;
									list.sdate=this.orderInfo.sdate;
									list.price=Number(this.orderInfo.priceJSON.price)*100;
									list.orderResType=this.orderInfo.orderResType;
									
									//支付页面显示信息
									let urlShowParam={
										dname:this.orderInfo.deptName,
										oname:this.orderInfo.oname,
										pname:this.aumSeletedInfo.pname,
										ename:this.orderInfo.ename,
										price: this.orderInfo.priceJSON.price+'元',										
										orderDay:this.orderInfo.orderDay,	
									}
									let sureInfo={
									    orderSerial:list.orderSerial,
										appOrderId:list.appOrderId,
										visitNotice:list.visitNotice,
										patientId:list.patientId
									}
									let urlParam={
										requestParams:requestParams,
										urlShowParam:urlShowParam,
										sureInfo:sureInfo
									}									
									uni.redirectTo({
										url:"/pages/appointment/pay/pay?urlParam="+JSON.stringify(urlParam)
									})
									
								}					
							})
						}
					}
				})
			},
			getData(){				
				this.$globalMethod.ds_api({
					method:"m=B0012&token=SemXlsuV0Ko2Ugrp",
					loadmsg:"医院详情",					
					data:{
						orgUuid:this.orderInfo.orgUuid,						
					},
					success:(res)=>{
						if(!res || !res.data.data){
							return
						}
						this.$set(this.orderInfo,"addr",res.data.data.addr);
						this.$set(this.orderInfo,"oname",res.data.data.oname)
						
					}					
				})
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
						this.aumList=res.data.data;
						this.getUmender();
					}					
				})
				
			},
			getUmender(){
				
				this.aumList.forEach((item)=>{
					this.uMenberId=this.uMenberId?this.uMenberId:item.userMemberUuid;
					if(item.aumUuid==this.uMenberId){
						this.$set(this.aumSeletedInfo,'pname',item.pname);
						
						this.$set(this.aumSeletedInfo,'mobile',item.mobile);
						this.$set(this.aumSeletedInfo,'aumUuid',item.aumUuid);						
						this.aumSeletedInfo.idcard=this.$globalMethod.hqkFuncStrEncrypt(item.idcard,4,10,'*');
						this.aumSeletedInfo.healthCardNo=this.$globalMethod.hqkFuncStrEncrypt(item.healthCardNo,4,10,'*');
					}					
				})
				
				
									
			}
		},
		computed: {
			...mapState(['$status']),			
		}
		
	}
</script>

<style lang="scss">		
	.warp{
		font-size:30upx;		
		width:100%;
		height:100%;
		line-height: 44upx;
	}
	.line-height{
		line-height: 52upx;
	}
	.icon-size{
		font-size:38upx;
	}
	
</style>

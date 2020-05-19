<template>
	<view class="content">
		<view class="navbar">
			<view v-for="(item, index) in tabList" :key="index" class="nav-item" :class="{current: current == index}" @click="tabClick(index)">
				{{item.text}}
			</view>
		</view>

		<swiper :current="current" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tabItem,tabIndex) in tabList" :key="tabIndex">
				<scroll-view class="list-scroll-content" scroll-y>
					<!-- 空白页 -->
					<empty v-if="tabItem.orderList.length == 0"></empty>
					<!-- 订单列表 -->
					<view class="order-box">
						<view class="order-list margin-bottom-sm bg-white" v-for="(item,index) in tabItem.orderList" :key="index">
							<view class="title flex space-between solid-bottom padding text-lg">
								<text>订单号：{{item.orderSerial}}</text>
								<text class="text-grey">{{item.statuName}}</text>
							</view>
							<view class="cu-list menu">
								<view class="<!-- cu-item --> arrow" @click="goHispital(item.orgUuid)">
									<view class="content">
										<text class="cuIcon-rankfill color-base"></text>
										<text class="text-black text-df">{{item.oname}}</text>
									</view>
								</view>
								<view class="cu-item arrow" @click="deptDetalClick(item.orgDeptUuid,item.orgUuid,item.dname)">
									<view class="content">
										<text class="cuIcon-fork color-base"></text>
										<text class="text-black text-df">{{item.dname}}</text>
									</view>
								</view>
							</view>
							<view class="cu-list menu-avatar">
								<view class="cu-item" @click="doctorDetail(item)">
									<view class="cu-avatar round lg" :style="{'background-image':'url('+item.headImage+')'}"></view>
									<view class="content">
										<view>{{item.ename}} <text  class="text-grey text-sm margin-left">{{item.jobTitle}}</text></view>
										<view class="text-gray text-sm flex">
											<view class="text-cut">							
												{{item.introduce}}
											</view>
										</view>
									</view>
									<view class="action">
										<view class="text-grey text-xs cuIcon-right"></view>					
									</view>
								</view>
							</view>
							<view class="order-box" @click="orderInfo(item)">
								<view class="padding-lr-lg padding-tb-xs flex">
									<view class="patient-title">就诊人</view>
									<view class="text-black">{{item.pname}}</view>
								</view>
								<view class="padding-lr-lg padding-tb-xs flex">
									<view class="patient-title">下单时间</view>
									<view class="text-black">{{item.applyTime}}</view>
								</view>
								<view class="padding-lr-lg padding-tb-xs flex">
									<view class="patient-title">就诊时间</view>
									<view class="text-black">{{item.sdate}}</view>
								</view>
								<view class="padding-lr-lg padding-tb-xs flex">
									<view class="patient-title">费用</view>
									<view class="text-black">{{item.price}}</view>
								</view>
								<view class="padding-lr-lg padding-tb-xs flex">
									<view class="patient-title">医院订单号</view>
									<view class="text-black">{{item.hisOrderId}}</view>
								</view>
							</view>
							<view class="text-right padding">
								<text class="solids padding-lr-sm padding-tb-xs text-sm radius-df" @click="deleteOrder(item.appOrderId,index)">删除订单</text>
							</view>
						</view>
						
						
					</view>
		
				</scroll-view>
			</swiper-item>
		</swiper>
		
		
	</view>
</template>

<script>
	
	import {mapState} from 'vuex';
	import empty from "@/components/empty";
	export default {
		components: {			
			empty
		},
		data() {
			return {
				tabList: [{

						state: '2',
						text: '待就诊',						
						orderList: []
					},
					{
						state: '3',
						text: '待评价',
						orderList: []
					},
					{
						state: '0',
						text: '全部订单',						
						orderList: []
					}
					
				],
				current: 0,
				refreshVer: 0,				
				
			};
		},
		onLoad(e) {
			
			this.loadData();
			
		},
		
		onShow() {
			let refreshVer = this.$status.getRefreshNum(this.$globalMethod.getPageName());
			if (this.refreshVer == refreshVer) {
				return;
			}
			this.loadData();
		},
		methods: {
			deptDetalClick(orgDeptUuid,orgUuid,deptName){
				uni.navigateTo({
					url: '/pages/appointment/dept-detal/dept-detal?orgDeptUuid='+orgDeptUuid+"&orgUuid="+orgUuid+'&deptName='+deptName
				});
			},
			goHispital(orgUuid) {
				let paramsUrl="?orgUuid="+orgUuid;
				uni.navigateTo({
					url: '/pages/appointment/hospital-dept/hospital-dept'+paramsUrl
				});
			},
			doctorDetail(item){
				let postParams={
					orgEmpUuid:item.orgEmpUuid,
					orgUuid:item.orgUuid,
					orgDeptUuid:item.orgDeptUuid,
					orgDeptEmpUuid:item.orgDeptEmpUuid
				}
				let deptName=item.dname;
				uni.navigateTo({
					url: '/pages/appointment/doctor-info/doctor-detail?paramsUrl='+JSON.stringify(postParams)+"&deptName="+deptName+'&fromOrder=1'
				});
			},
			//swiper 切换
			changeTab(e) {
				this.current = e.target.current;
				
			},
			//顶部tab点击
			tabClick(index) {
				this.current = index;
				
			},

			orderInfo(item) {
				uni.navigateTo({
					url: '/pages/appointment/order/orderInfo?orderInfo='+JSON.stringify(item)
				});
			},
			pingjia(orderInfo) {
				
			},
			
			//删除订单
			deleteOrder(appOrderId,index) {
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
									appOrderId: appOrderId
								},
								success: (res) => {
									uni.showToast({
										title:"删除成功",
										icon:"none"
									})
									this.tabList[2].orderList.splice(index,1)
								}
							})
						}
					}
				});
				
				
			},
			
			//获取订单列表
			async loadData() {
				this.$globalMethod.ds_api({
					method:"m=O004&token=SemXlsuV0Ko2Ugrp",
					loadmsg:"订单列表",					
					data:{
						userId:this.$status.userId()
					},
					success:(res)=>{
						if(!res || res.data.data.length==0){
							return
						}
						let list=res.data.data;
						list.forEach((item)=>{
							item.headImage=item.headImage?item.headImage:"../../static/doctorDefault.png";
							if(item.status==1){
								this.tabList[1].orderList.push(item)
								this.$set(item,"statuName","待缴费");
							}
							if(item.status==2){
								this.tabList[0].orderList.push(item);
								this.$set(item,"statuName","待就诊");
							}
							if(item.status==3){
								this.tabList[1].orderList.push(item)
								this.$set(item,"statuName","待评价");
							}
							if(item.status==4){
								this.$set(item,"statuName","已完成");
							}
							if(item.status==5){
								this.$set(item,"statuName","已取消");
							}
							this.tabList[2].orderList.push(item)
						})
						
					}					
				})
				
			},
			
		},
		computed: {
			...mapState(['$status']),		
		},
	}
</script>

<style lang="scss">
	
	page,
	.content {
	
		height: 100%;
	}

	.swiper-box {
		height: calc(100% - 40px);
	}

	.list-scroll-content {
		height: 100%;
	}
	.patient-title{
		width:200upx;
	}
	.cu-list.menu>.cu-item{
		min-height:88upx;
	}
	.navbar {
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0, 0, 0, .06);
		position: relative;
		z-index: 10;

		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 15px;
			color: #333;
			position: relative;

			&.current {
				color:#fa436a;

				&:after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 44px;
					height: 0;
					border-bottom: 2px solid #fa436a;
				}
			}
		}
	}

	.uni-swiper-item {
		height: auto;
	}
	.cu-list+.cu-list{
		margin-top:0;
	}
	.cu-list.menu-avatar>.cu-item .content>uni-view:first-child {
		padding:18upx 0;
		font-size:28upx;
	}
	
	
	
	
</style>

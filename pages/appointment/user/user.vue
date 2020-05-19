<template>
	<view class="warp">		
		<view class="cu-item flex bg-color padding y-center">
			<view class="cu-avatar round xl" :style="{'background-image':'url('+$status._status.headImgUrl+')'}"></view>
			<view class="content text-white margin-left">
				<view class="line-height" @click="goLogin">{{$status._status.pname}} <text class="text-sm margin-left">{{$status._status.mobile}}</text></view>
				<view class="line-height">
					<view class="text-df">							
						性别:女
					</view>
					<view class="text-df">
						身份证：4345********45793
					</view>
				</view>
			</view>
		</view>
		
		<view class="cu-list menu margin-top">
			<view class="cu-item arrow" @click="OrderClick">
				<view class="content">
					<text class="cuIcon-calendar color-base"></text>
					<text class="text-black">我的订单</text>
				</view>
				
			</view>
			<view class="cu-item arrow" @click="update">
				<view class="content">
					<text class="cuIcon-countdown text-brown"></text>
					<text class="text-black" >版本更新</text>
				</view>
			</view>
		</view>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-base margin-tb-sm lg text-white" @click="loginOut">退出</button>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {		
		data(){
			return {
				
			}
		},
		onLoad(){
			
			this.getData()
		},
		methods:{
			goLogin(){
				if(this.$status._status.hasLogin){
					return
				}
				uni.navigateTo({
					url: '/pages/appointment/login/login'
				});
			},
			update(){
				uni.showToast({
					title:"版本已是最新",
					icon:"none"
				})
			},
			OrderClick(){
				if(!this.$status._status.hasLogin){
					uni.navigateTo({
						url: '/pages/appointment/login/login'
					});
					return
				}
				uni.navigateTo({
					url:"/pages/appointment/order/orderDetail"
				})
			},
			loginOut(){
				this.$status.logout();
				
			},
			getData(){
				this.$globalMethod.ds_api({
					method:"m=Y007&token=SemXlsuV0Ko2Ugrp&openId=" + this.$globalMethod.openID+"&publicOpenId="+this.$globalMethod.openWatchId,
					loadmsg:"就诊人信息",					
					data:{
						userId:this.$status.userId()
					},
					success:(res)=>{
						if(!res || Object.keys(res.data.data).length==0){
							return
						}											
					
						
						
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
		
	}
	.bg-color{
		background: #157BC7;
	}
	.line-height{
		line-height: 48upx;
	}
	.text-color{
		color:#42ff5e;
	}
	.hospital-num{
		display: inline-block;
		width:30upx;
		height:30upx;
		
	}
</style>

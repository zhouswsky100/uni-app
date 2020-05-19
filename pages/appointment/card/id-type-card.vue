<template>
	<view class="warp">
		<view class="cu-list menu sm-border">
			<view class="cu-item arrow" @click="addCard">
				<view class="content text-lg">
					<text class="cuIcon-roundadd text-grey"></text>
					<text class="text-black">添加就诊卡</text>
				</view>
			</view>
		</view>
		<view class="cu-list menu-avatar">
			<view class="cu-item" v-for="(item,index) in cardList" :key="index" @click="baseInfoClick">
				<view class="cu-avatar round lg" style="background-image:url(../../../static/hosptialDefault.png);"></view>
				<view class="content">
					<view class="text-grey">
						{{item.oname}}						
					</view>
					<view class="text-gray text-sm">
						<view class="text-cut">
							就诊卡 
							{{item.medicalCard}}
						</view>
						  
					</view>
				</view>				
			</view>
			
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		data(){
			return {
				cardList:[],
				aumUuid:0
			}
		},
		onLoad(e){
			this.aumUuid=e.aumUuid;
			this.getData()
		},
		methods:{
			addCard(){
				uni.navigateTo({
					url:"/pages/appointment/card/add-patient-card?aumUuid="+this.aumUuid
				});
			},
			baseInfoClick(){
				uni.navigateTo({
					url:"/pages/appointment/select-patient/basisinformation"
				});
			},
			getData(){
				
				this.$globalMethod.ds_api({
					method:"m=Y017&token=SemXlsuV0Ko2Ugrp&openId=" + this.$globalMethod.openID+"&publicOpenId="+this.$globalMethod.openWatchId,
					loadmsg:"就诊卡列表",
					data:{
						userId: this.$status.userId(), 
						aumUuid: this.aumUuid
					},
					success:(res)=>{
						if(!res || !res.data.data || res.data.data.length==0){
							return
						}
						let list=res.data.data;
						list.forEach((item)=>{
							this.cardList.push(item)
							
						})
					}					
				})
				
			}
		},
		computed: {
			...mapState(['$status']),
		},
		
	}
</script>

<style>
	
	.self-style{
		line-height: 1.4em !important;
	}
	.cu-list.menu-avatar>.cu-item .content{
		width:calc(100% - 51px - 32px - 10px);
	}
</style>

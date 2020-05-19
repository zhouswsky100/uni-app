<template>
	<view class="warp">
		<view class="cu-list menu-avatar">
			<view class="cu-item" v-for="(item,index) in patientList" :key="index" @click="selectpatient(item.aumUuid)">
				<view class="cu-avatar round lg" style="background-image:url(../../../static/touxiang2.png);"></view>
				<view class="content">
					<view class="text-grey">
						{{item.pname}} {{item.age}}岁
						<text class="padding-lr-xs radius bg-base text-white text-sm flex self-style margin-left-xs" v-if="item.aumUuid==item.userMemberUuid">默认</text>
					</view>
					<view class="text-gray text-sm">
						<view class="text-cut">
							<text class="cuIcon-card text-gray  margin-right-xs"></text>
							{{item.idcard}}
							<text class="cuIcon-phone text-gray  margin-lr-xs"></text>
							{{item.mobile}}
						</view>
						  
					</view>
				</view>
				<view class="center">
					<view class="action text-xxl">
						<text class="cuIcon-roundcheckfill color-base" v-if="item.aumUuid==aumSeleted"></text>
						 <text class="cuIcon-roundcheck text-gray" v-else></text>
						
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
				patientList:[],
				aumSeleted:""
				
			}
		},
		onLoad(e){		
			this.getData()
		},
		methods:{
			selectpatient(aumUuid){
				this.aumSeleted=aumUuid;
				uni.setStorageSync('uMenberId',aumUuid);
				this.$status.addRefreshNum("order")
				uni.navigateBack()
			},
			getData(){
					
				this.$globalMethod.ds_api({
					method:"m=Y005&token=SemXlsuV0Ko2Ugrp&openId=" + this.$globalMethod.openID,
					loadmsg:"就诊人列表",					
					data:{
						userId:this.$status.userId()						
					},
					success:(res)=>{
						if(!res || res.data.data.length==0){
							return
						}
						let list=res.data.data;
						const uMenberId=uni.getStorageSync('uMenberId');
						list.forEach((item)=>{
							item.age=this.$globalMethod.getAge(item.idcard);
							item.idcard=this.$globalMethod.hqkFuncStrEncrypt(item.idcard,4,10,'*');
							item.mobile=this.$globalMethod.hqkFuncStrEncrypt(item.mobile,4,3,'*');
							this.patientList.push(item);
							let uMenderId=uMenberId?uMenberId:item.userMemberUuid
							if(item.aumUuid==uMenberId){
								this.aumSeleted=uMenderId
							}
						})
						
					}					
				})
				
			}
		},
		computed: {
			...mapState(['$status']),
			
		},
		onNavigationBarButtonTap(e) {
			if(e.index===0){
				uni.navigateTo({
					url:"/pages/appointment/select-patient/patient-manage"
				});
			}			
		},
		
	}
</script>

<style>
	
	.self-style{
		line-height: 1.4em !important;
	}
</style>

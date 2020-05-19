<template>
	<view class="warp">
		<view class="text-center text-spec padding-sm text-grey">绑定就诊卡可帮助医院快速识别用户就诊信息</view>
		<view class="margin-sm bg-white padding-tb-sm radius-df">
			<view class="text-center padding-sm solid-bottom text-lg">就 诊 卡</view>
			<view class="padding-sm flex-row">
				<view class="p-name">姓名</view>
				<view>{{patientObj.pname}}</view>
			</view>
			<view class="padding-sm flex-row">
				<view class="p-name">出生日期</view>
				<view>{{patientObj.birthday}}</view>
			</view>
			<view class="padding-sm flex-row">
				<view class="p-name">绑卡医院</view>
				<view>{{hispital.orgName}}</view>
			</view>
			<view class="padding-sm flex-row">
				<view class="p-name">绑卡医院</view>
				<view class="bg-gray padding-xs"><input type="text" @input="input"  :value="medicalCard" placeholder="请输入就诊卡"></input></view>
			</view>
		</view>
		<view class="padding flex flex-direction">
			
			<button class="cu-btn bg-base margin-tb-sm lg text-white" @click="submit">保 存</button>
		</view>
		
	</view>	
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		data() {
			return {												
				aumUuid:0,
				medicalCard:"",
				patientObj:{},
				hispital:{}
			}
		},
		onLoad(e){
			this.aumUuid=e.aumUuid;
			// this.orgUuid=e.orgUuid;
			this.hispital=JSON.parse(e.hispital);
			this.getData();
		
			
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
			submit(){
				this.$globalMethod.ds_api({
					method:"m=Y018&token=SemXlsuV0Ko2Ugrp&openId=" + this.$globalMethod.openID,
					loadmsg:"就诊卡",
					data:{
						aumUuid:this.aumUuid,
						userId: this.$status.userId(),
						orgUuid:this.hispital.orgUuid,
						medicalCard:this.medicalCard
					},
					success:(res)=>{
						if(!res || !res.data.data){
							return
						}
						uni.showToast({
							title:"绑定成功",
							icon:"none"
						})
						this.$status.addRefreshNum("add-patient-card");
						uni.navigateBack();
						
					},
					fail:(err)=>{
						uni.showToast({
							title:"绑定失败",
							icon:"none"
						})
					}
				})
			},
			getData(){				
				this.$globalMethod.ds_api({
						method:"m=Y007&token=SemXlsuV0Ko2Ugrp&openId=" + this.$globalMethod.openID,
						loadmsg:"就诊人信息",					
						data:{
							userId:this.$status.userId(),
							aumUuid:this.aumUuid
						},
						success:(res)=>{
							if(!res || !res.data.data){
								return
							}
							this.patientObj=res.data.data;
						}					
					})
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
	
</style>


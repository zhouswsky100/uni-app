<template>
	<view class="warp">
		<view class="cu-list menu sm-border">
			<view class="cu-item arrow" @click="addDoctorm">
				<view class="content text-lg">
					<text class="cuIcon-roundadd text-grey"></text>
					<text class="text-black">添加就诊人</text>
				</view>
			</view>
		</view>
		<view class="cu-list menu-avatar">
			<view class="cu-item"  v-for="(item,index) in patientList" :key="index" @click="baseInfoClick(item.aumUuid)" @longpress="deletePatient(index,item)">
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
				<view>
					<view class="action text-xl">						
						<text class="cuIcon-right text-gray margin-left"></text>						
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
				refresh:0,
				idcard:""
			}
		},
		onLoad(){
			
			this.getData()
		},
		onShow(){
			if(this.refresh==this.$status.getRefreshNum(this.$globalMethod.getPageName())){
				return
			}			
			this.getData()
		},
		methods:{
			addDoctorm(){
				uni.navigateTo({
					url:"/pages/appointment/select-patient/add-doctorm"
				});
			},
			baseInfoClick(aumUuid){
				uni.navigateTo({
					url:"/pages/appointment/select-patient/basisinformation?idcard="+this.idcard+"&aumUuid="+aumUuid
				});
			},
			deletePatient(index,item){
				uni.showModal({
					title:"确定要删除吗？",
					content:"删除后是不可恢复的！",
					success:(res)=>{
						 if(res.confirm){
							 this.$globalMethod.ds_api({
							 	method:"m=Y009&token=SemXlsuV0Ko2Ugrp&openId=" + this.$globalMethod.openID,
							 	loadmsg:"就诊人列表",					
							 	data:{	
								    userId: this.$status.userId(), 
									aumUuid: item.aumUuid,
								    idcard: item.idcard, 
									pref: item.pref							 						
							 	},
							 	success:(res)=>{
							 		uni.showToast({
							 			title:"删除成功"
							 		})
							 		this.patientList.splice(index,1);
							 	}					
							 })
						}
					}
				})
			},
			getData(){
				this.patientList=[];
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
						list.forEach((item)=>{
							this.idcard=item.idcard;
							item.age=this.$globalMethod.getAge(item.idcard);							
							item.idcard=this.$globalMethod.hqkFuncStrEncrypt(item.idcard,4,10,'*');
							item.mobile=this.$globalMethod.hqkFuncStrEncrypt(item.mobile,4,3,'*');
							this.patientList.push(item);
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
</style>

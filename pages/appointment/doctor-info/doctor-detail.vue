<template>
	<view class="warp">		
		<view class="cu-item flex bg-color padding y-center">
			<view class="cu-avatar round xl" :style="{'background-image':'url('+doctorInfo.headImage+')'}"></view>
			<view class="content text-white margin-left">
				<view class="line-height">{{doctorInfo.ename}} <text class="text-sm margin-left">{{deptName}}</text></view>
				<view class="line-height">
					<view class="text-df">							
						{{doctorInfo.jobTitle}}
					</view>
					<view class="text-df">
						{{doctorInfo.oname}}
					</view>
				</view>
			</view>
		</view>
		<view class="flex space-between bg-color padding-lr padding-tb-sm y-center text-sm">
			<view class="text-white">好评：<text class="text-color">{{doctorInfo.praise}}</text></view>
			<view class="text-white">粉丝：<text class="text-color">{{doctorInfo.fans}}</text></view>
			<view class="text-white">总预约量：<text class="text-color">{{doctorInfo.totalOrder}}</text></view>
		</view>
		<view class="padding-sm">
			<view class="hospital-note-box bg-white radius-df">
				<view class="padding  solid-bottom flex space-between">
					<view class="text-black">门诊地点</view>
					<view class="color-base" @click="goGh">去挂号<text class="cuIcon-right"></text></view>
				</view>
				<view class="padding-lr padding-tb-sm  text-df" v-for="(item,index) in doctorInfo.orgJson">
					<text class="hospital-num bg-base text-white text-center margin-right-xs">{{(index+1)}}</text>{{item.hname}}
				</view>
			</view>
			<view class="hospital-note-box bg-white radius-df margin-top-sm">
				<view class="padding text-black text-lg solid-bottom">擅长</view>
				<view class="padding-lr padding-tb-sm text-gray text-spec">{{doctorInfo.goodat?doctorInfo.goodat:'暂无信息'}}</view>
			</view>
			<view class="hospital-note-box bg-white radius-df margin-top-sm">
				<view class="padding text-black text-lg solid-bottom">简介</view>
				<view class="padding-lr padding-tb-sm text-gray text-spec">
					<u-parse :content="doctorInfo.introduce" class="text-spec" /></u-parse>
				<!-- {{doctorInfo.introduce?doctorInfo.introduce:'暂无信息'}} -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue'
	export default {
		components: {
			uParse
		},
		data(){
			return {
				postData:{},
				doctorInfo:{},
				deptName:"",
				fromOrder:null
			}
		},
		onLoad(e){
			this.postData=JSON.parse(e.paramsUrl);
			this.deptName=e.deptName;
			if(e.fromOrder){
				this.fromOrder=e.fromOrder
			}
			this.getData()
		},
		methods:{
			goGh(){
				if(this.fromOrder){
					let paramsUrl="?orgUuid="+this.postData.orgUuid+"&orgDeptUuid="+this.postData.orgDeptUuid+"&orgDeptEmpUuid="+this.postData.orgDeptEmpUuid;
					uni.navigateTo({
						url: '/pages/appointment/doctor-info/doctor-info'+paramsUrl
					});
				}else{
					uni.navigateBack()
				}
				
			},
			getData(){
				this.$globalMethod.ds_api({
					method:"m=B0031&token=SemXlsuV0Ko2Ugrp",
					loadmsg:"医生信息",					
					data:this.postData,
					success:(res)=>{
						if(!res || Object.keys(res.data.data).length==0){
							return
						}											
						this.doctorInfo=res.data.data;
						this.doctorInfo.headImage=this.doctorInfo.headImage?this.doctorInfo.headImage:'../../../static/doctorDefault.png';
						this.doctorInfo.introduce=this.doctorInfo.introduce?this.doctorInfo.introduce:"暂无信息";
						
						
					}					
				})
				
			}
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

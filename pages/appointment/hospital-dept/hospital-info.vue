<template>
	<view class="warp">
		<view class="hospital-info-box">
			<view class="solid-bottom text-lg padding">
				{{onameFull}}
			</view>
			<view class="padding flex-row space-between solid-bottom" v-for="(item,index) in detailList" :key="index">
				<view class="text-df text-black hos-name margin-right-ms">{{item.name}}</view>
				<view class="text-df text-gray">{{item.content}}</view>
			</view>
		</view>
		<view class="hospital-note-box">
			<view class="padding text-black text-lg solid-bottom">简介</view>
			<view class="padding-lr padding-tb-sm text-gray">
				<u-parse :content="introduce" class="text-spec" /></u-parse>
			</view>
		</view>
		<view class="hospital-note-box">
			<view class="padding text-black text-lg solid-bottom">公共交通</view>
			<view class="padding-lr padding-tb-sm text-gray">
				<u-parse :content="busline" class="text-spec" /></u-parse>
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
				orgUuid:"",
				detailList:[
					{
						field:"oname",
						name:"别名",
						content:""
					},
					{
						field:"phone",
						name:"电话",
						content:""
					},
					{
						field:"addr",
						name:"地址",
						content:""
					},
					{
						field:"website",
						name:"网址",
						content:""
					}
				],
				introduce:"",
				busline:"",
				onameFull:""
			}
		},
		onLoad(e){
			this.orgUuid=e.orgUuid
			this.getData()
		},
		methods:{
			getData(){
				this.$globalMethod.ds_api({
					method:"m=B0012&token=SemXlsuV0Ko2Ugrp",
					loadmsg:"医院详情",
					showLoading:false,
					data:{
						orgUuid:this.orgUuid,						
					},
					success:(res)=>{
						if(!res || res.data.data.length==0){
							return
						}
						let detailObj=res.data.data;
						this.detailList.forEach((item)=>{
							item.content=detailObj[item.field]
						})
						this.introduce=detailObj.introduce;
						this.busline=detailObj.busline;
						this.onameFull=detailObj.onameFull;
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
		background-color: #fff;
	}
	.hospital-note-box{
		border-top:20upx solid #f2f2f2;
	}
	.hos-name{
		flex-shrink: 0;
		width:100upx;
	}
</style>

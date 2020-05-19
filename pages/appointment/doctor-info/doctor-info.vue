<template>
	<view class="warp">
		<view class="cu-list menu-avatar">
			<view class="cu-item" @click="doctorDetail">
				<view class="cu-avatar round lg" :style="{'background-image':'url('+doctorInfo.headImage+')'}"></view>
				<view class="content">
					<view>{{doctorInfo.ename}} <text  class="text-grey text-sm margin-left">{{doctorInfo.jobTitle}}</text></view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">							
							{{doctorInfo.introduce}}
						</view>
					</view>
				</view>
				<view class="action">
					<view class="text-grey text-xs cuIcon-right"></view>					
				</view>
			</view>
		</view>
		
		<view class="sub-list-box">
			<view class="sub-list flex-row space-between" @click="ghShowChange">
				<view class="sub-list-content">
					<text class="cuIcon-titles text-blue"></text>
					<text class="text-grey text-df">{{deptInfo.dname}} {{deptInfo.oname}}</text>
				</view>
				<view class="sub-list-right margin-right-sm">
					<text class="text-gray" :class="ghShow?'cuIcon-fold':'cuIcon-unfold'"></text>
				</view>
			</view>
			<view v-show="ghShow" class="table-box margin-sm">
				<swiper :autoplay="false" indicator-dots="true" circular="true" style="height: 350upx;">
					<swiper-item v-for="(week,key) in dataArray" :key="key">
						<view>
							<view class="cu-list grid col-8" v-for="(dayItem,dayIndex) in week" :key="dayIndex">
								<view class="cu-item item-width" :class="{active:Object.keys(item).length>0 && Object.prototype.toString.call(item)=='[object Object]'}" v-for="(item,index) in dayItem" :key="index">								
									<text class="text-center" v-if="Object.keys(item).length>0 && Object.prototype.toString.call(item)=='[object Object]'" @click="ghDetail(item)">挂号</text>
									<text class="text-center" v-else>{{item.length>0?item:""}}</text>
								</view>
								
							</view>
						</view>
						<view class="text-center text-sm padding-sm">左右滑动日历查看其他时间表</view>
						<!-- <view class="cu-list grid col-8">
							<view class="cu-item item-width" :class="{active:Object.keys(item).length>0 && item.constructor ===Object}" v-for="(item,index) in week.afternoon" :key="index" v-if="index<24">								
								<text class="text-center" v-if="Object.keys(item).length>0 && item.constructor ===Object">挂号</text>
								<text class="text-center" v-else>{{item.length>0?item:""}}</text>
							</view>
						</view> -->
					</swiper-item>
				</swiper>
				
			</view>
		</view>
		<view class="sub-list-box">
			<view class="sub-list flex-row space-between">
				<view class="sub-list-content">
					<text class="cuIcon-titles text-blue"></text>
					<text class="text-grey">患者评价</text>
				</view>
				<view class="sub-list-right margin-right-sm">
					{{doctorInfo.commentScore}}
				</view>
			</view>
			<view class="pinglun-list bg-white b-t">
				暂无评价信息			
			</view>
		</view>
		
		<light-modal ref="hospitalGh" :confirmButton="false">
			<view class="gh-box">
				<view class="flex-sub text-left">
					<view class="padding-xs">
						<text class="text-black">{{selectedGh.orderDay}}</text>
					</view>
					<view class="padding-xs">{{deptInfo.oname}}</view>
				</view>
				<view class="grid col-3">				
					<view class="margin-tb-xs text-center padding-xs" v-for="(item,index) in ghInfoList" :key="index" @click="orderClick(item)">
						<button class="cu-btn radius shadow line-black flex-column  padding-tb-xl text-df line-height">
							<view>{{item.timeBegin}} - {{item.timeEnd}}</view>
							<view>({{item.amountOverplus==0?"约满":"还剩余"+item.amountOverplus+"个"}})</view>
						</button>
					</view>
				</view>
				<view class="text-center padding-sm text-df" v-if="ghInfoList.length==0">数据加载中，请稍后...</view>
			</view>
		</light-modal>
	</view>	
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		data(){
			return {
				ghShow:true,
				postParams:{
					orgUuid:"",
					orgDeptUuid:"",
					orgDeptEmpUuid:"",
					orgEmpUuid:""	
				},
				doctorInfo:{
					ename: "",
					introduce:"" ,
					jobTitle: "",
					orgEmpUuid:"" ,
					orgUuid: "",
					commentScore:"",
					
				},
				deptInfo:{},
				dataArray:[],
				ghInfoList:[],
				selectedGh:{}
				
			}
		},
		onLoad(e){
			this.postParams.orgUuid=e.orgUuid;
			this.postParams.orgDeptUuid=e.orgDeptUuid;
			this.postParams.orgDeptEmpUuid=e.orgDeptEmpUuid;
			if(e.orgEmpUuid){
				this.postParams.orgEmpUuid=e.orgEmpUuid;
			}
			this.getData();
			
		},
		methods:{
			doctorDetail(){
				this.postParams.orgEmpUuid=this.doctorInfo.orgEmpUuid
				uni.navigateTo({
					url: '/pages/appointment/doctor-info/doctor-detail?paramsUrl='+JSON.stringify(this.postParams)+"&deptName="+this.deptInfo.dname
				});
			},
			ghDetail(item){				
				this.selectedGh={};
				this.ghInfoList=[];
				this.selectedGh=item;				
				this.$globalMethod.ds_api({
					method:"m=Q002&token=SemXlsuV0Ko2Ugrp",
					loadmsg:"挂号信息",
					showLoading:false,
					data:{
						scheduleUuid:item.scheduleUuid,
						orgUuid:this.postParams.orgUuid
					},
					success:(res)=>{
						if(!res || res.data.data.length==0){
							return
						}
						let list=res.data.data;
						list.forEach((item)=>{
							this.ghInfoList.push(item);
						})
						this.selectedGh.orderDay=this.ghInfoList[0].orderDay

					},
					fail:(err)=>{
						uni.showToast({
							title:"数据加载失败",
							icon:"none"
						})
						this.$refs.hospitalGh.close();
					}
				})
				this.$refs.hospitalGh.show();
				
			},
			ghShowChange(){
				this.ghShow=!this.ghShow;
			},
		
			orderClick(ghInfo){
				if(!this.$globalMethod.checkLogin(this.$status.hasLogin())){					
					return
				}
				
				if(ghInfo.amountOverplus==0){
					return;
				}
				let urlObj={
					...this.selectedGh,					
					...ghInfo,
					ename:this.doctorInfo.ename,										
					jobTitle:this.doctorInfo.jobTitle,					
					deptName:this.deptInfo.dname,
					headImage:this.doctorInfo.headImage				
				}				
				uni.navigateTo({
					url: '/pages/appointment/order/order?orderInfo='+JSON.stringify(urlObj)
				});
				this.$refs.hospitalGh.close();				
			},
			getData(){
				this.$globalMethod.ds_api({
					method:"m=Q001&token=SemXlsuV0Ko2Ugrp",
					loadmsg:"医院排班信息",					
					data:this.postParams,
					success:(res)=>{
						if(!res || res.data.data.length==0){
							return
						}
						let infoObj=res.data.data;
						//console.log(null.constructor);
						
						for(let key in this.doctorInfo){
							this.doctorInfo[key]=infoObj[key];
						}
						this.doctorInfo.headImage=infoObj.headImage?infoObj.headImage:'../../../static/doctorDefault.png';
						this.doctorInfo.introduce=this.doctorInfo.introduce?this.doctorInfo.introduce.replace(/<\/?.+?>/g,""):"暂无信息";
						this.deptInfo.oname=infoObj.deptOderArray[0].oname;
						this.deptInfo.dname=infoObj.deptOderArray[0].dname;
						let hasValue=infoObj.deptOderArray[0].dataArray==""?infoObj.deptOderArray[1].dataArray:infoObj.deptOderArray[0].dataArray;
						hasValue.forEach((item)=>{							
							this.dataArray.push(item)
						})
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
		background-color: #fff;
	}
	.gh-box{
		padding:10upx;
	}
	.sub-list{
		padding:0 20upx;
		height:90upx;
		line-height: 90upx;
		background: #fff;
	}
	.sub-list-box{
		border-top:20upx solid #f2f2f2;
		background: #f2f2f2;
	}
	.sub-list-right text{
		font-size:32upx;
	}
	.item-width{
		width:12.5%;
		&.active{
			background:#157BC7 ;						
		}
		&.active text{
			color:#fff !important;
		}
	}
	.table-box{
		width:710upx;
		background: #fff;
		border-radius: 20upx;
		margin-bottom:0;
		
	}
	.cu-list.grid>.cu-item{
		padding:10upx 0;
	}
	.cu-list+.cu-list {
	    margin-top: 0;
	}
	.pinglun-list{
		padding:5upx 20upx;
		line-height: 72upx;
	}
	.line-height{
		line-height:32upx;
	}
</style>

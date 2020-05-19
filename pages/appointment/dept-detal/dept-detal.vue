<template>
	<view class="warp">
		<view class="date-zhanwei">
			<view class="date-bg">
				<view class="date-box flex-row">
					<view class="today">
						<view class="today-text content-center round" @click="dayClick(today,index,1)">
							今天
						</view>
					</view>
					<view class="after-day">
						<scroll-view :scroll-left="scrollLeft" scroll-with-animation scroll-x class="after-scroll">
							<view class="after-day-item" :class="{active:checkedDay==item.day}" v-for="(item,index) in dayList" :key="index" @click="dayClick(item,index)">								
								<view>{{item.month}}月</view>
								<view class="scroll-day">{{item.day}}</view>								
							</view>	
						</scroll-view>
					</view>
				</view>
			</view>
		</view>
		<view class="dept-list-box cu-list menu-avatar">
			<view class="cu-item" v-for="(item,index) in doctorList" :key="index" @click="doctorInfoClick(item)">
				<view class="cu-avatar round lg" :style="{'background-image':'url('+item.headImage+')'}"></view>
				<view class="content">
					<view class="text-black">{{item.ename}} <text class="text-sm margin-left-sm">{{item.jobTitle}}</text></view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">						
							{{item.note?item.note:'暂无介绍信息'}}
						</view> 
					</view>
				</view>
				<view class="action">					
					<view class="cu-tag round bg-blue df">可预约</view>
				</view>
			</view>		
		</view>
		
		
	</view>
</template>

<script>	
		export default {
			data(){
				return {
					dayList:[],
					today:{},
					doctorList:[],
					checkedDay:0,
					scrollLeft:0,
					orgUuid:0,
					orgDeptUuid:0,
					postTime:null
					
				}
			},
			onLoad(e){
				this.orgDeptUuid=e.orgDeptUuid;
				this.orgUuid=e.orgUuid;				
				this.getDay(7);
				uni.setNavigationBarTitle({
				    title: e.deptName
				})
				//this.postTime=this.today.year+"-"+this.today.month+"-"+this.today.day;
				this.getData();
			},
			
			methods:{
				dayClick(item,index,now=0){
					if(item.day==this.checkedDay){
						return
					}
					if(now==1){				
						this.$nextTick(()=>{
							this.scrollLeft=0;
						});
					 }
					this.scrollLeft = (index - 1) * 80
					this.checkedDay=item.day;
					this.postTime=item.year+'-'+item.month+'-'+item.day;
					this.getData();
					
				},
				getDay(countDay){
					let date = new Date();										
					this.today.year=date.getFullYear();
					this.today.month=this.$globalMethod.beforeNine((date.getMonth()+1));
					this.today.day=this.$globalMethod.beforeNine(date.getDate());
					if(countDay!=null){
						for(let i=0;i<countDay;i++){
							date.setDate(date.getDate() + 1);
							this.dayList.push({
								year:date.getFullYear(),
								month:this.$globalMethod.beforeNine((date.getMonth()+1)),
								day:this.$globalMethod.beforeNine(date.getDate())
							})
							
						}
					}										
				},
				doctorInfoClick(item){
					let paramsUrl="?orgUuid="+item.orgUuid+"&orgDeptUuid="+item.orgDeptUuid+"&orgDeptEmpUuid="+item.orgDeptEmpUuid;
					uni.navigateTo({
						url: '/pages/appointment/doctor-info/doctor-info'+paramsUrl
					});
				},
				getData(){
					this.doctorList=[];
					this.$globalMethod.ds_api({
						method:"m=B003&token=SemXlsuV0Ko2Ugrp",
						loadmsg:'预约医生列表',
						showLoading:false,
						data:{
							orgUuid:this.orgUuid,
							orgDeptUuid:this.orgDeptUuid,
							sdate:this.postTime
						},
						success:(res)=>{
							if(!res || res.data.data.length==0){
								return;
							}
							let list=res.data.data.empArray;
							list.forEach((item)=>{
								item.headImage=item.headImage?item.headImage:'../../../static/doctorDefault.png';
								this.doctorList.push(item)
							})
							
						},
						fail:(err)=>{
							uni.showToast({
								title:"加载失败"
							})
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
	.date-zhanwei{
		width:100%;
		height:107upx;		
	}
	.date-bg{
		position: fixed;
		z-index: 3;
		width:100%;		
		height:107upx;
	}
	.date-box{		
		width:100%;
		height:107upx;		
		.today{
			width:107upx;
			height:107upx;
			background: #157BC7;
			border-radius: 0 0 50% 50%;
			padding:5upx;
			border-bottom:1upx solid #ccc;
			.today-text{
				width:100%;
				height:100%;
				background: #fff;
				color:#157BC7;
				
				
			}
		}
		.after-day{
			width:643upx;			
		}
	}
	.after-scroll{
		width:643upx;
		white-space: nowrap;
	}
	.after-day-item{
		display: inline-block;
		width:107upx;
		height:107upx;
		background: #157BC7;
		border-radius: 0 0 50% 50%;
		padding:5upx;
		border-bottom:1upx solid #ccc;
		&.active{
			background:rgb(193, 221, 240);
		}
		view{
			margin-top:17upx;
			text-align: center;
			color:#fff;
			font-size:26upx;
			&.scroll-day{
				font-size:28upx;
				font-weight: bold;
				margin-top:10upx;
			}
		}
	}
	.dept-list-box{
		margin-top:30upx;
		min-height:500upx;
	}
</style>

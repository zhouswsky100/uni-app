<template>
	<view class="warp">
	
		<view class="dept-list-box flex-row">
			<view class="dept-list-left">
				<scroll-view scroll-y class="left-aside">					
					<view v-for="(item,index) in areaList" :key="index" class="f-item b-b text-spec" :class="{active: currentId==index}" @click="tabtap(index)">
						{{item.name}}
					</view>
				</scroll-view>
			</view>
			<view class="dept-list-right">
				<view class="dept-item flex-row y-center space-between text-spec" v-for="(item,index) in rightList" :key="index" @click="patientInfo(item)">					
					<text>{{item.orgName}}</text>
					<text class="cuIcon-right"></text>
				</view>
			</view>
		</view>
		
	</view>	
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				areaList:null,
				currentId:0,
				aumUuid:0,
				refresh:0
				
			}
		},
		onLoad(e){
			this.aumUuid=e.aumUuid;
			this.getData();

		},
		onShow(){
			if(this.refresh==this.$status.getRefreshNum(this.$globalMethod.getPageName())){
				return
			}			
			this.getData()
		},
		methods:{
		
			tabtap(index){	
				if(this.currentId==index){
					return
				}							
				this.currentId=index;			
			},			
		
			patientInfo(item){
				uni.navigateTo({
					url: '/pages/appointment/card/insert-patient-card?hispital='+JSON.stringify(item)+'&aumUuid='+this.aumUuid
				});
			},
			
			getData(){
				this.areaList=[];
				this.$globalMethod.ds_api({
					method:"m=Y016&token=SemXlsuV0Ko2Ugrp&openId=" + this.$globalMethod.openID,
					loadmsg:"医院查询",									
					success:(res)=>{
						if(!res || !res.data.data){
							return
						}
						let obj=res.data.data;
						for(let key in obj){
							let itemObj={
								name:"",
								itemList:[]
							}
							itemObj.name=key;
							itemObj.itemList=obj[key]
							this.areaList.push(itemObj)
						}
						
					}					
				})
			}
		
		},
		computed: {
			...mapState(['$status']),
			rightList(){
				return this.areaList[this.currentId].itemList
			}
		},
	}
</script>


<style lang="scss">
		
	.warp{
		font-size:30upx;		
		width:100%;
		height:100%;
		background-color: #fff;
	}
	
	.self-style{
		font-size:34upx;
	}

	.dept-list-box{
		min-height:1000upx;
		.dept-list-left{
			flex: 2;
			background-color: #eee;
			
		}
		.dept-list-right{
			flex: 3;
			.dept-item{
				padding:15upx;
				text{
					color:#333
				}
			}
		}
	}
	.left-aside{
		height:100%;
		background: #f2f2f2;
		
	}
	.f-item{
		padding:15upx;
		&.active{
			background: #fff;
		}
	}
</style>
